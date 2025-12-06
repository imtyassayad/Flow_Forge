
"use client"
import { useState } from "react";
import { loadRazorpay } from "@/lib/razorpay";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Check } from "lucide-react";

export default function BillingPage() {
    const [loading, setLoading] = useState(false);

    const handleUpgrade = async (plan: string) => {
        setLoading(true);
        try {
            const hasScript = await loadRazorpay();
            if (!hasScript) {
                alert("Failed to load payment SDK");
                setLoading(false);
                return;
            }
            
            const { data } = await api.post('/billing/order/', { plan });
            
            const options = {
                key: data.key,
                amount: data.amount,
                currency: data.currency,
                name: data.name,
                description: data.description,
                order_id: data.order_id,
                handler: async function (response: any) {
                    try {
                        await api.post('/billing/verify/', response);
                        alert("Payment Successful! Subscription Active.");
                        // Refresh user/session state here
                    } catch (e) {
                         alert("Payment Verification Failed");
                    }
                },
                prefill: {
                    name: "User", // Can fetch from context
                    email: "user@example.com"
                }
            };
            
            const rzp = new (window as any).Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error("Payment failed", error);
            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <h2 className="text-3xl font-bold tracking-tight">Billing & Plans</h2>
            <div className="grid gap-6 lg:grid-cols-3">
                 <Card>
                    <CardHeader>
                        <CardTitle>Free</CardTitle>
                        <CardDescription>For hobbyists</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="text-4xl font-bold">₹0<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
                        <div className="flex items-center space-x-2 text-sm">
                            <Check className="text-green-500 h-4 w-4" /> <span>3 Workflows</span>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" variant="outline" disabled>Current Plan</Button>
                    </CardFooter>
                </Card>

                <Card className="border-primary shadow-lg scale-105">
                    <CardHeader>
                        <CardTitle>Pro</CardTitle>
                        <CardDescription>For power users</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="text-4xl font-bold">₹999<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
                         <div className="flex items-center space-x-2 text-sm">
                            <Check className="text-green-500 h-4 w-4" /> <span>Unlimited Workflows</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                            <Check className="text-green-500 h-4 w-4" /> <span>AI Agent Access</span>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" onClick={() => handleUpgrade('pro')} disabled={loading}>
                            {loading ? "Processing..." : "Upgrade to Pro"}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
