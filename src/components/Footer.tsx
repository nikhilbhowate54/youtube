const Footer = () => {
  return (
    <footer className="border-t mt-auto">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built with{" "}
          <span role="img" aria-label="love" className="text-red-500">
            ❤️
          </span>{" "}
          by{" "}
          <a
            href="https://lovable.dev"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Lovable
          </a>
        </div>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <a href="#" className="underline underline-offset-4">
            Terms
          </a>
          <a href="#" className="underline underline-offset-4">
            Privacy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;