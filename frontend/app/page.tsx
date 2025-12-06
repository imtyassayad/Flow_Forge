
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, Cpu, Layout, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b sticky top-0 bg-background/80 backdrop-blur-md z-50">
        <Link className="flex items-center justify-center font-bold text-2xl tracking-tighter" href="#">
          <Zap className="h-6 w-6 mr-2 text-primary" />
          FlowForge
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="#pricing">
            Pricing
          </Link>
          <Link href="/login">
             <Button variant="ghost" size="sm">Log In</Button>
          </Link>
          <Link href="/register">
            <Button size="sm">Get Started</Button>
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex flex-col items-center text-center relative overflow-hidden">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
                    Automate with Intelligence
                  </h1>
                  <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                    Build powerful AI Agents visually. Connect LLMs, Tools, and Workflows on a infinite canvas. No code required.
                  </p>
                </div>
                <div className="space-x-4 pt-4">
                  <Link href="/register">
                    <Button size="lg" className="h-12 px-8 text-lg shadow-lg shadow-primary/25">Start Building Free</Button>
                  </Link>
                  <Link href="#demo">
                     <Button size="lg" variant="outline" className="h-12 px-8 text-lg">View Demo</Button>
                  </Link>
                </div>
              </div>
            </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Everything you need to scale AI
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  From prototyping to production, FlowForge gives you the tools to orchestrate complex agentic behaviors.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
               <Card className="bg-background/60 backdrop-blur-sm border-primary/10">
                   <CardHeader>
                       <Layout className="h-10 w-10 text-primary mb-2" />
                       <CardTitle>Visual Canvas</CardTitle>
                       <CardDescription>Drag, drop, and connect nodes to design your workflow logic intuitively.</CardDescription>
                   </CardHeader>
               </Card>
               <Card className="bg-background/60 backdrop-blur-sm border-primary/10">
                   <CardHeader>
                       <Cpu className="h-10 w-10 text-primary mb-2" />
                       <CardTitle>Local & Cloud Models</CardTitle>
                       <CardDescription>Integrate Ollama for local privacy or connect to OpenAI, Gemini, and Grok.</CardDescription>
                   </CardHeader>
               </Card>
               <Card className="bg-background/60 backdrop-blur-sm border-primary/10">
                   <CardHeader>
                       <Zap className="h-10 w-10 text-primary mb-2" />
                       <CardTitle>Real-time Execution</CardTitle>
                       <CardDescription>Watch your agents think and act in real-time with streaming logs and debug tools.</CardDescription>
                   </CardHeader>
               </Card>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                 Simple, Transparent Pricing
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                 Choose the plan that fits your needs. Upgrade anytime.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-5xl mx-auto">
                 {/* Free Plan */}
                 <Card>
                    <CardHeader>
                        <CardTitle>Free</CardTitle>
                        <CardDescription>For hobbyists and learners</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="text-4xl font-bold">₹0<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
                        <ul className="grid gap-2 text-sm">
                            <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> 3 Workflows</li>
                            <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> Basic Nodes</li>
                            <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> Community Support</li>
                        </ul>
                         <Link href="/register" className="w-full">
                            <Button className="w-full" variant="outline">Get Started</Button>
                         </Link>
                    </CardContent>
                </Card>

                {/* Pro Plan */}
                <Card className="border-primary shadow-xl scale-105 relative">
                    <div className="absolute -top-4 left-0 right-0 mx-auto w-fit bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">POPULAR</div>
                    <CardHeader>
                        <CardTitle>Pro</CardTitle>
                        <CardDescription>For creators and power users</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="text-4xl font-bold">₹999<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
                        <ul className="grid gap-2 text-sm">
                            <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> Unlimited Workflows</li>
                            <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> Advanced AI Agents</li>
                            <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> Priority Support</li>
                            <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> Local Model Access</li>
                        </ul>
                        <Link href="/register" className="w-full">
                            <Button className="w-full">Start Pro Trial</Button>
                        </Link>
                    </CardContent>
                </Card>

                 {/* Enterprise Plan */}
                 <Card>
                    <CardHeader>
                        <CardTitle>Enterprise</CardTitle>
                        <CardDescription>For teams and organizations</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="text-4xl font-bold">Custom</div>
                        <ul className="grid gap-2 text-sm">
                            <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> Custom Integrations</li>
                            <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> SSO & Audit Logs</li>
                            <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> Verified SLAs</li>
                        </ul>
                         <Link href="#" className="w-full">
                            <Button className="w-full" variant="outline">Contact Sales</Button>
                         </Link>
                    </CardContent>
                </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-6 w-full shrink-0 border-t items-center px-4 md:px-6 bg-muted/20">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground">© 2024 FlowForge Inc. All rights reserved.</p>
            <nav className="flex gap-4 sm:gap-6">
              <Link className="text-xs hover:underline underline-offset-4" href="#">
                Terms of Service
              </Link>
              <Link className="text-xs hover:underline underline-offset-4" href="#">
                Privacy
              </Link>
            </nav>
        </div>
      </footer>
    </div>
  );
}
