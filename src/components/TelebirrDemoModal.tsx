import React, { useState } from 'react';
import { X, CheckCircle2, Phone, ShieldCheck, Smartphone, Lock, ArrowRight, RefreshCw, Send } from 'lucide-react';

interface TelebirrDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  amountETB: number;
  merchantName: string;
  merchantCode: string;
  guestPhone: string;
  onSuccess: (txnId: string, phone: string) => void;
}

export const TelebirrDemoModal: React.FC<TelebirrDemoModalProps> = ({
  isOpen,
  onClose,
  amountETB,
  merchantName,
  merchantCode,
  guestPhone,
  onSuccess
}) => {
  const [phoneNumber, setPhoneNumber] = useState(guestPhone || '0911234567');
  const [pin, setPin] = useState('');
  const [step, setStep] = useState<'prompt' | 'pin' | 'processing' | 'success'>('prompt');
  const [generatedTxnId, setGeneratedTxnId] = useState('');

  if (!isOpen) return null;

  const handleSendPrompt = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('pin');
  };

  const handleAuthorizePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');

    setTimeout(() => {
      const txn = `TB-${Math.floor(1000000 + Math.random() * 9000000)}`;
      setGeneratedTxnId(txn);
      setStep('success');
    }, 1500);
  };

  const handleFinish = () => {
    onSuccess(generatedTxnId, phoneNumber);
    onClose();
    setStep('prompt');
    setPin('');
  };

  return (
    <div className="fixed inset-0 z-60 overflow-y-auto bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-stone-200">
        
        {/* Telebirr Top Bar Header */}
        <div className="bg-[#005cb9] text-white p-5 flex items-center justify-between border-b border-blue-600">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-400 text-blue-950 font-black flex items-center justify-center text-sm shadow-md">
              tb
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm tracking-wide">telebirr</span>
                <span className="text-[10px] font-bold bg-amber-400 text-blue-950 px-1.5 py-0.2 rounded-full uppercase">
                  Vendor Demo
                </span>
              </div>
              <p className="text-[11px] text-blue-100">Ethio Telecom Mobile Money</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-blue-700 text-blue-200 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Mobile Screen Simulation */}
        <div className="p-5 sm:p-6 space-y-5 text-stone-800">
          
          {/* Amount Badge */}
          <div className="bg-blue-50 border border-blue-200/80 rounded-2xl p-4 text-center space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-800">
              Pay to Merchant: {merchantName}
            </span>
            <div className="text-2xl font-black text-blue-950">
              {amountETB.toLocaleString()} <span className="text-sm font-bold text-blue-800">ETB</span>
            </div>
            <div className="text-[11px] text-stone-500 font-mono">
              Merchant Code: <strong>{merchantCode}</strong>
            </div>
          </div>

          {step === 'prompt' && (
            <form onSubmit={handleSendPrompt} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700">
                  Customer Telebirr Mobile Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                    <Smartphone className="w-4 h-4 text-blue-600" />
                  </div>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="0911234567"
                    className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-bold text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>
                <p className="text-[11px] text-stone-500">
                  Simulates sending a Telebirr USSD payment prompt or in-app authorization push to customer.
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#005cb9] hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Send Telebirr Push Prompt</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {step === 'pin' && (
            <form onSubmit={handleAuthorizePayment} className="space-y-4 animate-fadeIn">
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-1">
                <p className="font-bold">📱 Telebirr USSD Prompt Triggered on {phoneNumber}</p>
                <p className="text-[11px] text-amber-800">"Pay {amountETB.toLocaleString()} ETB to {merchantName}? Enter your 4-digit Telebirr PIN to confirm."</p>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700 flex items-center justify-between">
                  <span>Enter Telebirr PIN (Simulated)</span>
                  <span className="text-[10px] text-blue-700 font-normal">Any 4 digits</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                    <Lock className="w-4 h-4 text-blue-600" />
                  </div>
                  <input
                    type="password"
                    maxLength={4}
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="••••"
                    className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-center text-lg tracking-widest font-mono font-bold text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-blue-600"
                    autoFocus
                    required
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep('prompt')}
                  className="w-1/3 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold rounded-xl"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2.5 bg-[#005cb9] hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Authorize & Pay</span>
                </button>
              </div>
            </form>
          )}

          {step === 'processing' && (
            <div className="py-8 text-center space-y-3 animate-fadeIn">
              <RefreshCw className="w-10 h-10 text-blue-600 animate-spin mx-auto" />
              <div className="space-y-1">
                <h4 className="font-bold text-stone-900 text-sm">Processing with Ethio Telecom Gateway...</h4>
                <p className="text-xs text-stone-500">Debiting customer Telebirr account and crediting hotel merchant wallet.</p>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="space-y-4 text-center animate-fadeIn">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h4 className="font-black text-stone-900 text-base">Payment Successful!</h4>
                <p className="text-xs text-stone-500">Ethio Telecom Telebirr receipt generated</p>
              </div>

              {/* Simulated Telebirr SMS Receipt */}
              <div className="p-3 bg-stone-900 text-white rounded-xl text-left font-mono text-[11px] space-y-1.5 border border-stone-800 shadow-inner">
                <div className="flex justify-between text-amber-400 font-bold border-b border-stone-800 pb-1">
                  <span>TELEBIRR RECEIPT</span>
                  <span>CONFIRMED</span>
                </div>
                <div>Txn ID: <strong className="text-white">{generatedTxnId}</strong></div>
                <div>Merchant: {merchantName}</div>
                <div>Amount: {amountETB.toLocaleString()} ETB</div>
                <div>Sender: {phoneNumber}</div>
                <div className="text-[10px] text-stone-400 pt-1">Time: {new Date().toLocaleTimeString()}</div>
              </div>

              <button
                onClick={handleFinish}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Apply Telebirr Payment to Booking</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
