"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, ArrowRight } from "lucide-react";

export default function AuthPage() {
  const router = useRouter();
  const [view, setView] = useState("login");
  const [inputField, setInputField] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [savedUser, setSavedUser] = useState({
    userId: "test@gmail.com",
    password: "password123"
  });
  const [registeredUserId, setRegisteredUserId] = useState("");

  const handleSendOtp = (e, nextView) => {
    e.preventDefault();
    if (!inputField.trim()) return alert("Please enter your Email or Mobile!");
    alert(`OTP sent to: ${inputField}. (Use '1234')`);
    setRegisteredUserId(inputField);
    setView(nextView);
  };

  const handleVerifyOtp = (e, successView) => {
    e.preventDefault();
    if (otp === "1234") setView(successView);
    else alert("Incorrect OTP! Use '1234'.");
  };

  const handleCreatePassword = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) return alert("Passwords do not match!");
    setSavedUser({ userId: registeredUserId, password: password });
    alert("Account created! You can now login.");
    setView("login");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (inputField === savedUser.userId && password === savedUser.password) {
      alert("Access Granted!");
      router.push("/");
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <main className="min-h-[85vh] bg-[#0d0d0f] flex items-center justify-center px-6 py-12 text-[#f5f5f7]">
      <div className="w-full max-w-md bg-[#121215] border border-[#242429] rounded-2xl p-8 shadow-[0_0_50px_rgba(255,59,48,0.05)]">
        
        <div className="text-center mb-8">
          <ShieldCheck className="h-12 w-12 text-[#ff3b30] mx-auto mb-3 filter drop-shadow-[0_0_8px_rgba(255,59,48,0.4)]" />
          
        </div>

        {view === "login" && (
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[#ff3b30] mb-2"> (Email / Mobile)</label>
              <input type="text" required value={inputField} onChange={(e) => setInputField(e.target.value)} placeholder="Email or mobile number" className="w-full bg-[#1c1c1f] border border-[#242429] rounded-lg px-4 py-2.5 text-sm text-[#f5f5f7] outline-none focus:border-[#ff3b30] transition-all" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-bold uppercase tracking-widest text-[#ff3b30]">Password</label>
                <button type="button" onClick={() => setView("forget-password")} className="text-[11px] font-semibold text-[#e5a93c] hover:underline">Forgot?</button>
              </div>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full bg-[#1c1c1f] border border-[#242429] rounded-lg px-4 py-2.5 text-sm text-[#f5f5f7] outline-none focus:border-[#ff3b30] transition-all" />
            </div>
            <button type="submit" className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#ff3b30] py-3 text-sm font-black text-white uppercase tracking-wider hover:bg-[#ff453a] transition-all shadow-[0_4px_15px_rgba(255,59,48,0.2)]">
              Continue <ArrowRight className="h-4 w-4" />
            </button>
            <p className="text-center text-xs text-[#a1a1aa] mt-4"> <button type="button" onClick={() => setView("signup")} className="text-[#e5a93c] font-bold hover:underline">Create Account</button></p>
          </form>
        )}

        {view === "signup" && (
          <form onSubmit={(e) => handleSendOtp(e, "otp-verify-signup")} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[#ff3b30] mb-2">Register Email / Mobile</label>
              <input type="text" required value={inputField} onChange={(e) => setInputField(e.target.value)} placeholder="e.g. +9199999xxxxx" className="w-full bg-[#1c1c1f] border border-[#242429] rounded-lg px-4 py-2.5 text-sm text-[#f5f5f7] outline-none focus:border-[#ff3b30] transition-all" />
            </div>
            <button type="submit" className="w-full rounded-lg bg-[#ff3b30] py-3 text-sm font-black text-white uppercase tracking-wider hover:bg-[#ff453a] transition-all">submit</button>
            <p className="text-center text-xs text-[#a1a1aa] mt-4"><button type="button" onClick={() => setView("login")} className="text-[#e5a93c] font-bold hover:underline">Back to Login</button></p>
          </form>
        )}

        {(view === "otp-verify-signup" || view === "otp-verify-forget") && (
          <form onSubmit={(e) => handleVerifyOtp(e, "create-password")} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[#ff3b30] mb-1">Enter Verification Code</label>
              <p className="text-[11px] text-[#a1a1aa] mb-3">Sent to {registeredUserId}</p>
              <input type="text" maxLength="4" required value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Code (1234)" className="w-full text-center bg-[#1c1c1f] border border-[#242429] rounded-lg px-4 py-2.5 text-base font-bold tracking-widest text-[#f5f5f7] outline-none focus:border-[#ff3b30]" />
            </div>
            <button type="submit" className="w-full rounded-lg bg-[#ff3b30] py-3 text-sm font-black text-white uppercase tracking-wider hover:bg-[#ff453a] transition-all">Verify Code</button>
          </form>
        )}

        {view === "create-password" && (
          <form onSubmit={handleCreatePassword} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[#ff3b30] mb-2">New Password</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" className="w-full bg-[#1c1c1f] border border-[#242429] rounded-lg px-4 py-2.5 text-sm text-[#f5f5f7] outline-none focus:border-[#ff3b30]" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[#ff3b30] mb-2">Confirm Password</label>
              <input type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Re-enter password" className="w-full bg-[#1c1c1f] border border-[#242429] rounded-lg px-4 py-2.5 text-sm text-[#f5f5f7] outline-none focus:border-[#ff3b30]" />
            </div>
            <button type="submit" className="w-full rounded-lg bg-[#ff3b30] py-3 text-sm font-black text-white uppercase tracking-wider hover:bg-[#ff453a] transition-all">Save Credentials</button>
          </form>
        )}

        {view === "forget-password" && (
          <form onSubmit={(e) => handleSendOtp(e, "otp-verify-forget")} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[#ff3b30] mb-2">Forget Passsword</label>
              <input type="text" required value={inputField} onChange={(e) => setInputField(e.target.value)} placeholder="Registered mobile or email" className="w-full bg-[#1c1c1f] border border-[#242429] rounded-lg px-4 py-2.5 text-sm text-[#f5f5f7] outline-none focus:border-[#ff3b30]" />
            </div>
            <button type="submit" className="w-full rounded-lg bg-[#ff3b30] py-3 text-sm font-black text-white uppercase tracking-wider hover:bg-[#ff453a] transition-all">Send Reset OTP</button>
            <button type="button" onClick={() => setView("login")} className="w-full text-center text-xs font-semibold text-[#a1a1aa] hover:text-[#ff3b30] mt-2">Back to Login</button>
          </form>
        )}

      </div>
    </main>
  );
}