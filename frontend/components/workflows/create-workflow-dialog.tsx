
"use client"
import { useState } from "react"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import api from "@/lib/api"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
})

export function CreateWorkflowDialog({ projectId }: { projectId: string }) {
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })

  const mutation = useMutation({
    mutationFn: (newWorkflow: z.infer<typeof formSchema>) => {
      // Logic: Must pass 'project' ID in payload
      return api.post('/workflows/', { ...newWorkflow, project: projectId })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workflows', projectId] })
      setOpen(false)
      reset()
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
      mutation.mutate(values)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Create Workflow</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Workflow</DialogTitle>
          <DialogDescription>
            Definining a new process logic.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                Name
                </Label>
                <div className="col-span-3">
                    <Input
                    id="name"
                    {...register("name")}
                    className="col-span-3"
                    />
                    {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
                </div>
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                Desc
                </Label>
                <Input
                    id="description"
                    {...register("description")}
                    className="col-span-3"
                />
            </div>
            </div>
            <DialogFooter>
            <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? "Creating..." : "Create"}
            </Button>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
