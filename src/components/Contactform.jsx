import { useState } from "react";
import { FiCheck, FiX, FiAlertTriangle } from "react-icons/fi";

export default function Contactform() {
  // States: 'idle' | 'loading' | 'success' | 'error' | 'network'
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading"); // Lock button immediately so they can't double-click
    const form = e.target;
    const data = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/xwvdpyyp", {
        method: "POST",
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
        setTimeout(() => setStatus("idle"), 4000); // Revert to "Send" after 4s
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch (error) {
      setStatus("network");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  // Helper function that acts as the "Wardrobe" for your button depending on its mood
  const getButtonUI = () => {
    switch (status) {
      case "loading":
        return {
          text: "Sending...",
          icon: null,
          style: "bg-gray-500 text-white cursor-wait opacity-80"
        };
      case "success":
        return {
          text: "Sent!",
          icon: <FiCheck className="text-lg stroke-[3]" />,
          style: "bg-green-600 text-white font-bold tracking-wider"
        };
      case "error":
        return {
          text: "Failed",
          icon: <FiX className="text-lg stroke-[3]" />,
          style: "bg-red-600 text-white font-bold tracking-wider"
        };
      case "network":
        return {
          text: "Network Issue",
          icon: <FiAlertTriangle className="text-lg stroke-[2.5]" />,
          style: "bg-yellow-500 text-black font-bold tracking-wider"
        };
      default: // 'idle'
        return {
          text: "Send",
          icon: null,
          style: "bg-primary-light dark:bg-primary-dark hover:bg-gray-400 dark:hover:bg-gray-700 text-white hover:text-black font-medium"
        };
    }
  };

  const btn = getButtonUI();

  return (
    <section>
      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <div className="flex flex-col gap-6">
            <p className="text-copy-light font-display font-normal dark:text-copy-dark/80 leading-[1.7] text-[18px]">
              Feel free to contact me.
            </p>
            <span>
              <p className="font-display text-[14px]">Ibadan, OY. NIGERIA</p>
              <a
                href="mailto:thedev.isaiah@gmail.com"
                className="font-display text-[14px] text-blue-600 hover:text-blue-700 hover:underline transition-colors duration-300"
              >
                thedev.isaiah@gmail.com
              </a>
            </span>
          </div>
          <div>
            <form onSubmit={handleSubmit} className="w-full max-w-2xl">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <input
                  name="name"
                  placeholder="Your name"
                  className="w-full p-3 placeholder:font-display rounded-lg bg-gray-300 dark:bg-gray-800 placeholder-gray-500 text-gray-700 dark:text-gray-100 focus:outline-none"
                  required
                />
                <input
                  name="email"
                  type="email"
                  placeholder="myemail@email.com"
                  className="w-full p-3 placeholder:font-display rounded-lg bg-gray-300 dark:bg-gray-800 placeholder-gray-500 text-gray-700 dark:text-gray-100 focus:outline-none"
                  required
                />
              </div>
              <div className="mb-4">
                <textarea
                  name="message"
                  rows={6}
                  placeholder="Message..."
                  className="w-full p-3 placeholder:font-display rounded-lg bg-gray-300 dark:bg-gray-800 placeholder-gray-500 text-gray-700 dark:text-gray-100 focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={status !== "idle"}
                className={`w-full py-3 rounded-lg font-body text-[13px] transition-all duration-300 flex items-center justify-center gap-2 select-none ${btn.style}`}
              >
                {btn.icon}
                <span>{btn.text}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}