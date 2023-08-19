import { GithubIcon } from "lucide-react";
import { ContentWrapper } from "./content-wrapper";
import { Logo } from "./logo";

export const Footer = () => {
  return (
    <footer className="p-6 text-primary-foreground bg-primary">
      <ContentWrapper className="flex items-end justify-between gap-2">
        <div>
          <Logo />
          <p>Online shopping made easy</p>
        </div>
        <div className="flex gap-2 items-center justify-end">
          <div className="flex items-end justify-center flex-col gap-1 text-secondary text-sm">
            <p>
              Fictional online marketplace built by{" "}
              <a
                href="https://github.com/warrengalyen"
                className="text-white border-b pb-[1px] border-secondary"
              >
                @warrengalyen
              </a>
              .
            </p>
            <p>Source code available on GitHub.</p>
          </div>
        </div>
      </ContentWrapper>
    </footer>
  );
};
