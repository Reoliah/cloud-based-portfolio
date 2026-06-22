export default function Contactform() {
    const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    const mailto = `mailto:thedev.isaiah@gmail.com?subject=${encodeURIComponent(
      "Contact from " + name
    )}&body=${encodeURIComponent(
      message + "\n\nFrom: " + name + " <" + email + ">"
    )}`;
    window.location.href = mailto;
    form.reset();
  };
  
  return (
    <section>
        <div className="relative ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <div className="flex flex-col gap-6">
            <p className="text-copy-light font-display font-normal dark:text-copy-dark/80  leading-[1.7] text-[18px]">
              Feel free to contact me.
            </p>
            <span>
              <p className="font-display text-[14px]">
              Ibadan, OY. NIGERIA
            </p>
            <a href="mailto:thedev.isaiah@gmail.com" className="font-display text-[14px] text-blue-600 hover:text-blue-700 hover:underline transition-colors duration-300">
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
              <button type="submit" className="w-full bg-primary-light dark:bg-primary-dark hover:bg-gray-400 dark:hover:bg-gray-700 text-white hover:text-black font-body font-medium text-[13px] py-3 rounded-lg">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
    
  )
}