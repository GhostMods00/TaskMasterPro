declare module 'tailwind-merge' {
    function twMerge(...classes: (string | undefined | null | false)[]): string;
    export default twMerge;
  }