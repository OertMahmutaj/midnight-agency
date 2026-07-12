export default function PageNumber({
  value,
  className = '',
}: {
  value: string;
  className?: string;
}) {
  return (
    <sup
      aria-hidden="true"
      className={`ml-2 inline-block align-top text-base font-black leading-none tracking-normal sm:text-lg ${className}`}
    >
      ({value})
    </sup>
  );
}
