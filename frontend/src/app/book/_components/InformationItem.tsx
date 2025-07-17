interface InformationItemProps {
  title: string;
  value: string;
}

export default function InformationItem(props: InformationItemProps) {
  return (
    <main className="text-md flex size-full flex-row justify-between">
      <p className="font-bold">{`${props.title}:`}</p>
      <p>{props.value}</p>
    </main>
  );
}
