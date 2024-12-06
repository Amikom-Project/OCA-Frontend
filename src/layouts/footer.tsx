export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='w-full bg-gray-100 border-t px-4 flex items-center justify-center h-20'>
      <p className='uppercase font-medium text-xs text-center'>
        COPYRIGHT {currentYear} Direktorat Perencanaan Dan Keuangan <br />
        UNIVERSITAS AMIKOM YOGYAKARTA
      </p>
    </footer>
  );
}
