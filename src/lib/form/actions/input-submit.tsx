
import { toast } from "sonner"
import { InputFormValues } from "../validations/input-schema"

export function handleInputSubmit(data: InputFormValues) {
  toast("You submitted the following values", {
    description: (
      <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
        <code className="text-white">{JSON.stringify(data, null, 2)}</code>
      </pre>
    ),
  })
}
