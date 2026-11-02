import { useState } from "react";
import { ChevronDown, ChevronRight, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useIsMobile } from "@/hooks/use-mobile";

const roleCategories = [
  {
    label: "Entry-Level / Junior Roles",
    roles: [
      { value: "security-analyst-l1", label: "Security Analyst (Level 1)" },
      { value: "soc-analyst-t1", label: "SOC Analyst (Tier 1)" },
      { value: "cybersecurity-trainee", label: "Cybersecurity Trainee" },
      { value: "information-security-associate", label: "Information Security Associate" },
      { value: "security-operations-trainee", label: "Security Operations Trainee" },
      { value: "junior-penetration-tester", label: "Junior Penetration Tester" },
      { value: "vulnerability-management-associate", label: "Vulnerability Management Associate" },
      { value: "it-security-support-engineer", label: "IT Security Support Engineer" },
      { value: "network-security-associate", label: "Network Security Associate" },
      { value: "cybersecurity-intern", label: "Cybersecurity Intern" },
    ],
  },
  {
    label: "Mid-Level / Specialist Roles",
    roles: [
      { value: "soc-analyst-t2", label: "SOC Analyst (Tier 2)" },
      { value: "security-analyst-l2", label: "Security Analyst (Level 2)" },
      { value: "incident-response-analyst", label: "Incident Response Analyst" },
      { value: "threat-intelligence-analyst", label: "Threat Intelligence Analyst" },
      { value: "malware-analyst", label: "Malware Analyst" },
      { value: "digital-forensics-analyst", label: "Digital Forensics Analyst" },
      { value: "cloud-security-analyst", label: "Cloud Security Analyst" },
      { value: "penetration-tester", label: "Penetration Tester / Ethical Hacker" },
      { value: "security-compliance-analyst", label: "Security Compliance Analyst" },
      { value: "grc-analyst", label: "Governance, Risk & Compliance (GRC) Analyst" },
      { value: "application-security-analyst", label: "Application Security Analyst" },
      { value: "iam-analyst", label: "Identity & Access Management (IAM) Analyst" },
      { value: "network-security-engineer", label: "Network Security Engineer" },
      { value: "endpoint-security-engineer", label: "Endpoint Security Engineer" },
      { value: "devsecops-engineer", label: "DevSecOps Engineer" },
      { value: "vapt-engineer", label: "Vulnerability Assessment & Penetration Testing (VAPT) Engineer" },
      { value: "red-team-operator", label: "Red Team Operator" },
      { value: "blue-team-analyst", label: "Blue Team Analyst" },
      { value: "ot-ics-security-analyst", label: "OT/ICS Security Analyst" },
    ],
  },
  {
    label: "Senior-Level / Advanced Roles",
    roles: [
      { value: "senior-soc-analyst-t3", label: "Senior SOC Analyst (Tier 3)" },
      { value: "senior-security-analyst", label: "Senior Security Analyst" },
      { value: "senior-penetration-tester", label: "Senior Penetration Tester" },
      { value: "senior-incident-response-specialist", label: "Senior Incident Response Specialist" },
      { value: "senior-cloud-security-engineer", label: "Senior Cloud Security Engineer" },
      { value: "senior-digital-forensics-investigator", label: "Senior Digital Forensics Investigator" },
      { value: "senior-threat-hunter", label: "Senior Threat Hunter" },
      { value: "senior-security-compliance-specialist", label: "Senior Security Compliance Specialist" },
      { value: "senior-grc-consultant", label: "Senior GRC Consultant" },
      { value: "senior-iam-engineer", label: "Senior IAM Engineer" },
      { value: "senior-appsec-engineer", label: "Senior AppSec Engineer" },
      { value: "senior-network-security-engineer", label: "Senior Network Security Engineer" },
      { value: "senior-devsecops-specialist", label: "Senior DevSecOps Specialist" },
      { value: "senior-ot-ics-security-engineer", label: "Senior OT/ICS Security Engineer" },
    ],
  },
  {
    label: "Cybersecurity Architect / Specialist Roles",
    roles: [
      { value: "cybersecurity-architect", label: "Cybersecurity Architect" },
      { value: "cloud-security-architect", label: "Cloud Security Architect" },
      { value: "network-security-architect", label: "Network Security Architect" },
      { value: "application-security-architect", label: "Application Security Architect" },
      { value: "security-solutions-architect", label: "Security Solutions Architect" },
      { value: "zero-trust-architect", label: "Zero Trust Architect" },
      { value: "iam-architect", label: "IAM Architect" },
      { value: "devsecops-architect", label: "DevSecOps Architect" },
      { value: "ot-ics-security-architect", label: "OT/ICS Security Architect" },
      { value: "threat-intelligence-specialist", label: "Threat Intelligence Specialist" },
      { value: "security-automation-specialist", label: "Security Automation Specialist" },
    ],
  },
  {
    label: "Leadership / Managerial Roles",
    roles: [
      { value: "soc-team-lead", label: "SOC Team Lead" },
      { value: "soc-manager", label: "SOC Manager" },
      { value: "cybersecurity-manager", label: "Cybersecurity Manager" },
      { value: "it-security-manager", label: "IT Security Manager" },
      { value: "incident-response-manager", label: "Incident Response Manager" },
      { value: "threat-intelligence-manager", label: "Threat Intelligence Manager" },
      { value: "grc-manager", label: "GRC Manager" },
      { value: "compliance-manager", label: "Compliance Manager" },
      { value: "application-security-manager", label: "Application Security Manager" },
      { value: "cloud-security-manager", label: "Cloud Security Manager" },
      { value: "iam-manager", label: "IAM Manager" },
      { value: "vulnerability-management-lead", label: "Vulnerability Management Lead" },
      { value: "red-team-lead", label: "Red Team Lead" },
      { value: "blue-team-lead", label: "Blue Team Lead" },
    ],
  },
  {
    label: "Director-Level Roles",
    roles: [
      { value: "director-cybersecurity", label: "Director of Cybersecurity" },
      { value: "director-information-security", label: "Director of Information Security" },
      { value: "director-soc-operations", label: "Director of SOC Operations" },
      { value: "director-risk-compliance", label: "Director of Risk & Compliance" },
      { value: "director-threat-intelligence", label: "Director of Threat Intelligence" },
      { value: "director-cloud-security", label: "Director of Cloud Security" },
      { value: "director-grc", label: "Director of Governance, Risk & Compliance (GRC)" },
    ],
  },
  {
    label: "Executive-Level Roles",
    roles: [
      { value: "ciso", label: "Chief Information Security Officer (CISO)" },
      { value: "cso", label: "Chief Security Officer (CSO)" },
      { value: "cro", label: "Chief Risk Officer (CRO)" },
    ],
  },
];

export const getRoleLabel = (value: string) => {
  for (const category of roleCategories) {
    const role = category.roles.find((r) => r.value === value);
    if (role) return role.label;
  }
  return "";
};

interface RoleSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const RoleSelector = ({ value, onChange }: RoleSelectorProps) => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (roleValue: string) => {
    onChange(roleValue);
    setIsOpen(false);
  };

  const triggerButton = (
    <button
      type="button"
      className="flex h-12 w-full items-center justify-between rounded-md border border-border bg-secondary/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <span className={value ? "text-foreground" : "text-muted-foreground"}>
        {value ? getRoleLabel(value) : "Select a role"}
      </span>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </button>
  );

  // Mobile: Use Drawer with Accordion
  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>{triggerButton}</DrawerTrigger>
        <DrawerContent className="max-h-[85vh]">
          <DrawerHeader className="border-b border-border">
            <DrawerTitle>Select a Role</DrawerTitle>
            <DrawerClose className="absolute right-4 top-4">
              <X className="h-5 w-5" />
            </DrawerClose>
          </DrawerHeader>
          <div className="overflow-y-auto px-4 py-2">
            <Accordion type="single" collapsible className="w-full">
              {roleCategories.map((category, index) => (
                <AccordionItem key={category.label} value={`item-${index}`}>
                  <AccordionTrigger className="text-sm font-semibold text-primary hover:no-underline">
                    {category.label}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-1 pl-2">
                      {category.roles.map((role) => (
                        <button
                          key={role.value}
                          type="button"
                          onClick={() => handleSelect(role.value)}
                          className={`w-full text-left px-3 py-2.5 text-sm rounded-md transition-colors hover:bg-accent hover:text-white ${
                            value === role.value ? "bg-accent text-white" : ""
                          }`}
                        >
                          {role.label}
                        </button>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  // Desktop: Use DropdownMenu with nested submenus
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>{triggerButton}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-[300px] bg-background z-50" align="start">
        {roleCategories.map((category) => (
          <DropdownMenuSub key={category.label}>
            <DropdownMenuSubTrigger className="font-semibold text-primary">
              {category.label}
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="max-h-[300px] overflow-y-auto bg-background z-50">
                {category.roles.map((role) => (
                  <DropdownMenuItem
                    key={role.value}
                    onClick={() => handleSelect(role.value)}
                    className="cursor-pointer"
                  >
                    {role.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default RoleSelector;
