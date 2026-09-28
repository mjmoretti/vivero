import Container from "./Container";

const Footer = () => {
  return (
    <footer className="bg-[#fbf7ec] py-10 text-[#1f4d45]">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <img
            src="/Gemini1.jpg"
            alt="Logo"
            width={300}
            height={90}
            className="object-contain"
          />

          <div className="flex items-center gap-6 text-lg">
            <a href="#" className="hover:opacity-70">
              <i className="fab fa-facebook-f" />
            </a>
            <a href="#" className="hover:opacity-70">
              <i className="fab fa-linkedin-in" />
            </a>
            <a href="#" className="hover:opacity-70">
              <i className="fab fa-instagram" />
            </a>
          </div>
        </div>

        <div className="my-6 border-t border-[#1f4d45]" />

        <div className="space-y-1 text-sm">
          <p>Av. Francisco Beiró 2424, C1419 CABA</p>
          <p>Vivero Agronomía 2026 – Todos los derechos reservados</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;