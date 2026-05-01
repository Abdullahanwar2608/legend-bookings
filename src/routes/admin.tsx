import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAdminSession } from "@/lib/use-admin";
import {
  fetchAllServices,
  fetchUpcomingBookings,
  type Booking,
  type Service,
} from "@/lib/booking-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar,
  DollarSign,
  Users,
  Scissors,
  LogOut,
  ArrowLeft,
  Plus,
  Pencil,
  Trash2,
  Loader2,
  X,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Admin — Legend Barber Shop" }, { name: "robots", content: "noindex" }],
  }),
  component: AdminPage,
});

function AdminPage() {
  const { session, isAdmin, loading } = useAdminSession();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-gold" />
      </div>
    );
  }

  if (!session) return <LoginForm />;
  if (!isAdmin) return <NotAuthorized />;

  return <Dashboard />;
}

function LoginForm() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Signed in");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        toast.success(
          "Account created. If admin access is needed, ask the owner to grant your role.",
        );
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm bg-card border border-border rounded-2xl p-8 shadow-elegant"
      >
        <Link
          to="/"
          className="text-xs text-muted-foreground hover:text-gold inline-flex items-center gap-1 mb-4"
        >
          <ArrowLeft className="h-3 w-3" /> Site
        </Link>
        <h1 className="text-2xl font-bold mb-2">Admin {mode === "signin" ? "Login" : "Sign Up"}</h1>
        <p className="text-sm text-muted-foreground mb-6">
          {mode === "signin"
            ? "Sign in to manage bookings and services."
            : "Create an account, then have an owner grant admin access."}
        </p>
        <div className="space-y-3">
          <Input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            autoFocus
          />
          <Input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        <Button
          type="submit"
          disabled={submitting}
          className="w-full mt-4 bg-gradient-gold text-gold-foreground hover:opacity-90"
        >
          {submitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : mode === "signin" ? (
            "Sign In"
          ) : (
            "Create Account"
          )}
        </Button>
        <button
          type="button"
          onClick={() => setMode((m) => (m === "signin" ? "signup" : "signin"))}
          className="text-xs text-muted-foreground hover:text-gold mt-4 w-full text-center"
        >
          {mode === "signin" ? "Need an account? Sign up" : "Already have an account? Sign in"}
        </button>
      </form>
    </div>
  );
}

function NotAuthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md text-center bg-card border border-border rounded-2xl p-8 shadow-elegant">
        <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Your account doesn't have admin privileges. Contact the shop owner to be granted access.
        </p>
        <Button variant="outline" onClick={() => supabase.auth.signOut()}>
          <LogOut className="h-4 w-4 mr-2" /> Sign out
        </Button>
      </div>
    </div>
  );
}

function Dashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [tab, setTab] = useState<"appointments" | "services">("appointments");

  const refresh = async () => {
    const [b, s] = await Promise.all([fetchUpcomingBookings(), fetchAllServices()]);
    setBookings(b);
    setServices(s);
  };

  useEffect(() => {
    refresh();
  }, []);

  const revenue = bookings.reduce((sum, b) => sum + b.price, 0);

  return (
    <div className="min-h-screen p-6 md:p-10">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <Link
              to="/"
              className="text-sm text-muted-foreground hover:text-gold inline-flex items-center gap-1 mb-2"
            >
              <ArrowLeft className="h-3 w-3" /> Site
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold">
              Admin <span className="text-gradient-gold">Dashboard</span>
            </h1>
          </div>
          <Button variant="outline" onClick={() => supabase.auth.signOut()}>
            <LogOut className="h-4 w-4 mr-2" /> Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Stat icon={Calendar} label="Upcoming" value={bookings.length.toString()} />
          <Stat
            icon={Users}
            label="Services"
            value={services.filter((s) => s.active).length.toString()}
          />
          <Stat icon={DollarSign} label="Pending revenue" value={`$${revenue}`} />
        </div>

        <div className="flex gap-2 mb-6 border-b border-border">
          <TabBtn active={tab === "appointments"} onClick={() => setTab("appointments")}>
            Appointments
          </TabBtn>
          <TabBtn active={tab === "services"} onClick={() => setTab("services")}>
            Services
          </TabBtn>
        </div>

        {tab === "appointments" ? (
          <BookingsTable bookings={bookings} onChange={refresh} />
        ) : (
          <ServicesManager services={services} onChange={refresh} />
        )}
      </div>
    </div>
  );
}

function TabBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${active ? "border-gold text-gold" : "border-transparent text-muted-foreground hover:text-foreground"}`}
    >
      {children}
    </button>
  );
}

function BookingsTable({ bookings, onChange }: { bookings: Booking[]; onChange: () => void }) {
  const remove = async (id: string) => {
    if (!confirm("Cancel this appointment?")) return;
    const { error } = await supabase.from("bookings").delete().eq("id", id);
    if (error) toast.error(error.message);
    else {
      toast.success("Appointment cancelled");
      onChange();
    }
  };

  return (
    <div className="bg-card border border-border rounded-2xl shadow-elegant overflow-hidden">
      <div className="p-6 border-b border-border">
        <h2 className="font-semibold flex items-center gap-2">
          <Scissors className="h-4 w-4 text-gold" /> Upcoming Appointments
        </h2>
      </div>
      {bookings.length === 0 ? (
        <div className="p-12 text-center text-muted-foreground">No upcoming appointments.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-background/40 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="text-left px-6 py-3">Date</th>
                <th className="text-left px-6 py-3">Time</th>
                <th className="text-left px-6 py-3">Client</th>
                <th className="text-left px-6 py-3">Phone</th>
                <th className="text-left px-6 py-3">Service</th>
                <th className="text-right px-6 py-3">Price</th>
                <th className="text-right px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id} className="border-t border-border/50 hover:bg-background/30">
                  <td className="px-6 py-4 font-medium">{b.booking_date}</td>
                  <td className="px-6 py-4 text-gold font-semibold">{b.booking_time}</td>
                  <td className="px-6 py-4">{b.customer_name}</td>
                  <td className="px-6 py-4 text-muted-foreground">{b.customer_phone}</td>
                  <td className="px-6 py-4">{b.service_name}</td>
                  <td className="px-6 py-4 text-right font-semibold">${b.price}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => remove(b.id)}
                      className="text-muted-foreground hover:text-destructive p-1"
                      aria-label="Cancel"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

type ServiceForm = {
  name: string;
  price: string;
  duration: string;
  description: string;
  active: boolean;
};
const emptyForm: ServiceForm = { name: "", price: "", duration: "", description: "", active: true };

function ServicesManager({ services, onChange }: { services: Service[]; onChange: () => void }) {
  const [editing, setEditing] = useState<Service | null>(null);
  const [creating, setCreating] = useState(false);

  const remove = async (id: string) => {
    if (!confirm("Delete this service?")) return;
    const { error } = await supabase.from("services").delete().eq("id", id);
    if (error) toast.error(error.message);
    else {
      toast.success("Service deleted");
      onChange();
    }
  };

  return (
    <div className="bg-card border border-border rounded-2xl shadow-elegant overflow-hidden">
      <div className="p-6 border-b border-border flex items-center justify-between">
        <h2 className="font-semibold flex items-center gap-2">
          <Scissors className="h-4 w-4 text-gold" /> Services
        </h2>
        <Button
          size="sm"
          onClick={() => setCreating(true)}
          className="bg-gradient-gold text-gold-foreground hover:opacity-90"
        >
          <Plus className="h-4 w-4 mr-1" /> New
        </Button>
      </div>
      {services.length === 0 ? (
        <div className="p-12 text-center text-muted-foreground">No services yet.</div>
      ) : (
        <div className="divide-y divide-border/50">
          {services.map((s) => (
            <div key={s.id} className="p-5 flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold">{s.name}</h3>
                  <span className="text-gold font-bold">${s.price}</span>
                  <span className="text-xs text-muted-foreground">· {s.duration}</span>
                  {!s.active && (
                    <span className="text-[10px] uppercase px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                      Inactive
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{s.description}</p>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => setEditing(s)}
                  className="text-muted-foreground hover:text-gold p-2"
                  aria-label="Edit"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => remove(s.id)}
                  className="text-muted-foreground hover:text-destructive p-2"
                  aria-label="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {(creating || editing) && (
        <ServiceModal
          initial={
            editing
              ? {
                  name: editing.name,
                  price: String(editing.price),
                  duration: editing.duration,
                  description: editing.description,
                  active: editing.active ?? true,
                }
              : emptyForm
          }
          onClose={() => {
            setCreating(false);
            setEditing(null);
          }}
          onSave={async (form) => {
            const payload = {
              name: form.name.trim(),
              price: Number(form.price),
              duration: form.duration.trim(),
              description: form.description.trim(),
              active: form.active,
            };
            const { error } = editing
              ? await supabase.from("services").update(payload).eq("id", editing.id)
              : await supabase.from("services").insert(payload);
            if (error) {
              toast.error(error.message);
              return false;
            }
            toast.success(editing ? "Service updated" : "Service created");
            setCreating(false);
            setEditing(null);
            onChange();
            return true;
          }}
        />
      )}
    </div>
  );
}

function ServiceModal({
  initial,
  onClose,
  onSave,
}: {
  initial: ServiceForm;
  onClose: () => void;
  onSave: (f: ServiceForm) => Promise<boolean>;
}) {
  const [form, setForm] = useState<ServiceForm>(initial);
  const [saving, setSaving] = useState(false);

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-2xl shadow-elegant w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
        <h3 className="font-semibold text-lg mb-5">
          {initial === emptyForm ? "New Service" : "Edit Service"}
        </h3>
        <div className="space-y-3">
          <Field label="Name">
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              maxLength={80}
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Price ($)">
              <Input
                type="number"
                min="0"
                step="1"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />
            </Field>
            <Field label="Duration">
              <Input
                value={form.duration}
                onChange={(e) => setForm({ ...form, duration: e.target.value })}
                placeholder="45 min"
                maxLength={20}
              />
            </Field>
          </div>
          <Field label="Description">
            <Textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              maxLength={300}
            />
          </Field>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.active}
              onChange={(e) => setForm({ ...form, active: e.target.checked })}
              className="accent-gold"
            />
            Active (visible to customers)
          </label>
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <Button variant="ghost" onClick={onClose} disabled={saving}>
            Cancel
          </Button>
          <Button
            disabled={saving || !form.name || !form.price || !form.duration}
            onClick={async () => {
              setSaving(true);
              const ok = await onSave(form);
              if (!ok) setSaving(false);
            }}
            className="bg-gradient-gold text-gold-foreground hover:opacity-90"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs text-muted-foreground mb-1.5 block">{label}</label>
      {children}
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Calendar;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-elegant">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-muted-foreground uppercase tracking-wider">{label}</span>
        <Icon className="h-4 w-4 text-gold" />
      </div>
      <p className="text-3xl font-display font-bold text-gradient-gold">{value}</p>
    </div>
  );
}
