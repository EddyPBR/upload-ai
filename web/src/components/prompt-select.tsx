import { useEffect, useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { api } from "@/lib/axios";

interface IPromptState {
  id: string;
  title: string;
  template: string;
}

interface IPromptSelectProps {
  onPromptSelected: (template: string) => void;
}

export function PromptSelect(props: IPromptSelectProps) {
  const [prompts, setPrompts] = useState<IPromptState[]>([]);

  function handlePromptSelected(promptId: string) {
    const selectedPrompt = prompts?.find((prompt) => prompt.id === promptId);

    if (selectedPrompt) {
      props.onPromptSelected(selectedPrompt.template);
    }
  }

  const SelectOptions = useMemo(() => {
    return prompts.map((prompt) => {
      return (
        <SelectItem key={prompt.id} value={prompt.id}>
          {prompt.title}
        </SelectItem>
      );
    });
  }, [prompts]);

  useEffect(() => {
    api.get("/prompts").then((response) => {
      setPrompts(response.data);
    });
  }, []);

  return (
    <Select onValueChange={handlePromptSelected}>
      <SelectTrigger>
        <SelectValue placeholder="Selecione um prompt..." />
      </SelectTrigger>
      <SelectContent>
        {SelectOptions}
      </SelectContent>
    </Select>
  );
}
