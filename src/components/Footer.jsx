export default function Footer() {
  return(
    <footer className="w-full h-[512px] bg-white p-[40px] flex flex-col ">
      <section className="flex-1 flex flex-row justify-between">
        <section>
          <img src="/images/naess-logo-black.png" alt="Naess Shipping Philippines Logo" />
        </section>
      </section>
      <section className="h-[40px] w-full flex flex-row justify-between items-center border-t-2 border-black">
        <p className="text-[14px]">© 2025 NAESS SHIPPING PHILIPPINES, INC. All rights reserved.</p>
        <ul className="flex flex-row gap-4">
          <li>
            <a href="#" className="text-black text-[14px] underline">Privacy Policy</a>
          </li>
          <li>
            <a href="#" className="text-black text-[14px] underline">Terms of Service</a>
          </li>
          <li>
            <a href="#" className="text-black text-[14px] underline">Cookies Settings</a>
          </li>
        </ul>
      </section>
    </footer>
  );
}