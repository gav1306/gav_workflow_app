import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ArrowDownToLine, Play, Save } from "lucide-react";
import logoIcon from "@/assets/icons/Logo.webp";
import { Link } from "@tanstack/react-router";
import { PipelineBreadcrumb } from "../ui/pipeline-breadcrumb";

export const Header = () => {
  return (
    <header className="w-full p-4 absolute top-0 left-0 bg-transparent z-10 ">
      <nav className="w-full flex justify-between">
        <div className="border py-2 px-3 flex gap-2.5 rounded-sm shadow-md bg-white">
          <SidebarTrigger size="icon" />
          <Link to="/" className="h-9 w-9">
            <img src={logoIcon} alt="gav-workflow-logo" />
          </Link>
          <PipelineBreadcrumb />
        </div>
        <div className="border py-2 px-3 flex gap-2.5 rounded-sm shadow-md bg-white">
          <Button variant="outline">
            <Save />
            Save
          </Button>
          <Button variant="outline" className="rounded-sm">
            <ArrowDownToLine />
            Download
          </Button>
          <Button className="bg-primary text-white rounded-sm">
            <Play /> Run
          </Button>
        </div>
      </nav>
    </header>
  );
};
