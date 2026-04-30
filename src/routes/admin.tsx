import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getBookings, type Booking } from "@/lib/booking-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, DollarSign, Users, Scissors, LogOut, ArrowLeft } from "lucide-react";

const ADMIN_PASS = "legend2024";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Legend Barber Shop" }, { name: "robots", content: "noindex" }] }),
  component: AdminPage,
});

function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pass, setPass] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("legend_admin") === "1") setAuthed(true);
  }, []);

  useEffect(() => {
    if (authed) setBookings(getBookings());
  }, [authed]);

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (pass === ADMIN_PASS) {
              sessionStorage.setItem("legend_admin", "1");
              setAuthed(true);
            } else {
              alert("Incorrect password");
            }
          }}
          className="w-full max-w-sm bg-card border border-border rounded-2xl p-8 shadow-elegant"
        >
          <h1 className="text-2xl font-bold mb-2">Admin Access</h1>
          <p className="text-sm text-muted-foreground mb-6">Enter password to view dashboard.</p>
          <Input type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Password" autoFocus />
          <Button type="submit" className="w-full mt-4 bg-gradient-gold text-gold-foreground hover:opacity-90">Enter</Button>
          <p className="text-xs text-muted-foreground mt-4 text-center">Hint: legend2024</p>
        </form>
      </div>
    );
  }

  const today = new Date().toISOString().split("T")[0];
  const upcoming = bookings
    .filter((b) => b.date >= today)
    .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
  const revenue = upcoming.reduce((sum, b) => sum + b.price, 0);

  return (
    <div className="min-h-screen p-6 md:p-10">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link to="/" className="text-sm text-muted-foreground hover:text-gold inline-flex items-center gap-1 mb-2"><ArrowLeft className="h-3 w-3" /> Site</Link>
            <h1 className="text-3xl md:text-4xl font-bold">Admin <span className="text-gradient-gold">Dashboard</span></h1>
          </div>
          <Button variant="outline" onClick={() => { sessionStorage.removeItem("legend_admin"); setAuthed(false); }}>
            <LogOut className="h-4 w-4 mr-2" /> Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Stat icon={Calendar} label="Upcoming" value={upcoming.length.toString()} />
          <Stat icon={Users} label="Total bookings" value={bookings.length.toString()} />
          <Stat icon={DollarSign} label="Pending revenue" value={`$${revenue}`} />
        </div>

        <div className="bg-card border border-border rounded-2xl shadow-elegant overflow-hidden">
          <div className="p-6 border-b border-border">
            <h2 className="font-semibold flex items-center gap-2"><Scissors className="h-4 w-4 text-gold" /> Upcoming Appointments</h2>
          </div>
          {upcoming.length === 0 ? (
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
                  </tr>
                </thead>
                <tbody>
                  {upcoming.map((b) => (
                    <tr key={b.id} className="border-t border-border/50 hover:bg-background/30">
                      <td className="px-6 py-4 font-medium">{b.date}</td>
                      <td className="px-6 py-4 text-gold font-semibold">{b.time}</td>
                      <td className="px-6 py-4">{b.name}</td>
                      <td className="px-6 py-4 text-muted-foreground">{b.phone}</td>
                      <td className="px-6 py-4">{b.serviceName}</td>
                      <td className="px-6 py-4 text-right font-semibold">${b.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Stat({ icon: Icon, label, value }: { icon: typeof Calendar; label: string; value: string }) {
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
