import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

interface ToggleProps {
  changeCategoryFilter: (cat: string) => void
}

export function Toggle({ changeCategoryFilter }: ToggleProps) {
  return (
    <ToggleGroup
      onValueChange={changeCategoryFilter}
      type="single"
      defaultValue="Tudo"
    >
      <ToggleGroupItem value="Tudo">Tudo</ToggleGroupItem>
      <ToggleGroupItem value="Romance">Romance</ToggleGroupItem>
      <ToggleGroupItem value="Suspense">Suspense</ToggleGroupItem>
      <ToggleGroupItem value="Fábula">Fábula</ToggleGroupItem>
      <ToggleGroupItem value="Ficção">Ficção</ToggleGroupItem>
      <ToggleGroupItem value="Terror">Terror</ToggleGroupItem>
      <ToggleGroupItem value="Alegoria">Alegoria</ToggleGroupItem>
      <ToggleGroupItem value="Arquitetura">Arquitetura</ToggleGroupItem>
      <ToggleGroupItem value="Programação">Programação</ToggleGroupItem>
      <ToggleGroupItem value="Geek">Geek</ToggleGroupItem>
      <ToggleGroupItem value="Autoajuda">Autoajuda</ToggleGroupItem>
      <ToggleGroupItem value="Aventura">Aventura</ToggleGroupItem>
      <ToggleGroupItem value="Educação">Educação</ToggleGroupItem>
    </ToggleGroup>
  )
}
