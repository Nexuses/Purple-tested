import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import RoleSelector from "./RoleSelector";
const CTASection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    timeline: "",
    hiringLocation: "",
    salaryBudget: "",
    comment: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name.trim()) {
      toast({
        title: "Error",
        description: "Please enter your full name.",
        variant: "destructive"
      });
      return;
    }
    if (!formData.email.trim()) {
      toast({
        title: "Error",
        description: "Please enter your email address.",
        variant: "destructive"
      });
      return;
    }
    if (!formData.role) {
      toast({
        title: "Error",
        description: "Please select a role.",
        variant: "destructive"
      });
      return;
    }
    if (!formData.timeline) {
      toast({
        title: "Error",
        description: "Please select a hiring timeline.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          role: formData.role,
          timeline: formData.timeline,
          hiringLocation: formData.hiringLocation.trim(),
          salaryBudget: formData.salaryBudget.trim(),
          comment: formData.comment.trim(),
        }),
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok || payload.success === false) {
        throw new Error(payload.error || "Failed to submit consultation request");
      }

      if (payload.emailSent === false) {
        toast({
          title: "Request Saved",
          description: payload.emailError
            ? `Saved, but email failed: ${payload.emailError}`
            : "Saved to database, but notification email failed. Check SMTP settings.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Request Submitted!",
          description: "We'll connect you with verified talent shortly.",
        });
      }

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        role: "",
        timeline: "",
        hiringLocation: "",
        salaryBudget: "",
        comment: ""
      });
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return <section id="contact" className="py-24 bg-[#1a1033] border-t border-border/30 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-purple/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 text-center">
            {/* Desktop - single line */}
            <span className="hidden sm:inline bg-gradient-to-r from-[#FF6BF5] via-[#C77DFF] to-[#9D4EDD] bg-clip-text text-transparent">
              Stop Guessing. Start Securing.
            </span>
            {/* Mobile - two lines */}
            <span className="sm:hidden flex flex-col items-center">
              <span className="bg-gradient-to-r from-[#FF6BF5] via-[#C77DFF] to-[#9D4EDD] bg-clip-text text-transparent">Stop Guessing.</span>
              <span className="bg-gradient-to-r from-[#FF6BF5] via-[#C77DFF] to-[#9D4EDD] bg-clip-text text-transparent">Start Securing.</span>
            </span>
          </h2>
          <p className="text-white/90 text-lg max-w-xl mx-auto">Are you willing to risk a wrong hire or do you want a professional who strengthens your security posture from day one?</p>
        </motion.div>

        {/* Form Card */}
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        delay: 0.2
      }} className="bg-card p-8 sm:p-10 rounded-2xl shadow-2xl border border-border">
          <h3 className="text-xl font-bold text-card-foreground mb-8 text-center">
            Schedule a Talent Consultation
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name" className="text-sm font-semibold mb-2 block text-card-foreground">
                Full Name
              </Label>
              <Input id="name" type="text" placeholder="John Doe" value={formData.name} onChange={e => setFormData({
              ...formData,
              name: e.target.value
            })} className="h-12 bg-secondary/50 border-border" required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="email" className="text-sm font-semibold mb-2 block text-card-foreground">
                  Email Address
                </Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="john@company.com" 
                  value={formData.email} 
                  onChange={e => setFormData({
                    ...formData,
                    email: e.target.value
                  })} 
                  className="h-12 bg-secondary/50 border-border" 
                  required 
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-sm font-semibold mb-2 block text-card-foreground">
                  Phone Number
                </Label>
                <Input 
                  id="phone" 
                  type="tel" 
                  placeholder="+91 98765 43210" 
                  value={formData.phone} 
                  onChange={e => setFormData({
                    ...formData,
                    phone: e.target.value
                  })} 
                  className="h-12 bg-secondary/50 border-border"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="role" className="text-sm font-semibold mb-2 block text-card-foreground">
                  Role Needed
                </Label>
                <RoleSelector 
                  value={formData.role} 
                  onChange={(value) => setFormData({ ...formData, role: value })} 
                />
              </div>

              <div>
                <Label htmlFor="timeline" className="text-sm font-semibold mb-2 block text-card-foreground">
                  Hiring Timeline
                </Label>
                <Select value={formData.timeline} onValueChange={value => setFormData({
                ...formData,
                timeline: value
              })}>
                  <SelectTrigger className="h-12 bg-secondary/50 border-border">
                    <SelectValue placeholder="Select timeline" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediately">Immediately</SelectItem>
                    <SelectItem value="within-30-days">Within 30 days</SelectItem>
                    <SelectItem value="within-45-days">Within 45 days</SelectItem>
                    <SelectItem value="2-3-months">2-3 months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="hiringLocation" className="text-sm font-semibold mb-2 block text-card-foreground">
                  Hiring Location
                </Label>
                <Input 
                  id="hiringLocation" 
                  type="text" 
                  placeholder="e.g., Bangalore, Remote, Hybrid" 
                  value={formData.hiringLocation} 
                  onChange={e => setFormData({
                    ...formData,
                    hiringLocation: e.target.value
                  })} 
                  className="h-12 bg-secondary/50 border-border"
                />
              </div>

              <div>
                <Label htmlFor="salaryBudget" className="text-sm font-semibold mb-2 block text-card-foreground">
                  Salary Budget
                </Label>
                <Input 
                  id="salaryBudget" 
                  type="text" 
                  placeholder="e.g., ₹15-20 LPA" 
                  value={formData.salaryBudget} 
                  onChange={e => setFormData({
                    ...formData,
                    salaryBudget: e.target.value
                  })} 
                  className="h-12 bg-secondary/50 border-border"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="comment" className="text-sm font-semibold mb-2 block text-card-foreground">
                Comment
              </Label>
              <Textarea 
                id="comment" 
                placeholder="Tell us more about your requirements..." 
                value={formData.comment} 
                onChange={e => setFormData({
                  ...formData,
                  comment: e.target.value
                })} 
                className="min-h-[100px] bg-secondary/50 border-border resize-none"
              />
            </div>

            <Button type="submit" variant="accent" size="xl" className="w-full group" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Submitting...
                </>
              ) : (
                <>
                  View Available Candidates
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>

            <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-2">
              <Lock className="w-3 h-3" />
              Your data is secure.
            </p>
          </form>
        </motion.div>
      </div>
    </section>;
};
export default CTASection;