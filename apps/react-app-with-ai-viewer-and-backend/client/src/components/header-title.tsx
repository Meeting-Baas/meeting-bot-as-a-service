import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

interface HeaderTitleProps {
  path: string;
  title: string;
  subtitle?: React.ReactNode;
}

const HeaderTitle: React.FC<HeaderTitleProps> = ({ path, title, subtitle }) => {
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex flex-row items-center w-full">
          <div className="flex-shrink-0">
            <Link
              to={path}
              className="flex text-lg items-center py-2 gap-1 hover:text-muted-foreground w-min"
            >
              <ArrowLeft />
              <p>Back</p>
            </Link>
          </div>
          <div className="flex flex-col items-center flex-grow">
            <h1 className="text-2xl font-bold">{title}</h1>
          </div>
        </div>

        <div className="w-full">
          <Separator />
        </div>

        {subtitle && (
              <>
                <p className="text-muted-foreground text-center">
                  {typeof subtitle === "string"
                    ? subtitle
                    : React.Children.map(subtitle, (child) =>
                        typeof child === "string"
                          ? child
                          : React.cloneElement(child as React.ReactElement, {
                              className:
                                "text-muted-foreground hover:underline",
                            })
                      )}
                </p>
              </>
            )}
      </div>
    </>
  );
};

export { HeaderTitle };
