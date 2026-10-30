const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;

export const IMG = {
  hero: ["/hero-hotel.webp"],
  amenitiesBg: u("1600607687939-ce8a6c25118c", 2000),
  building: u("1551882547-ff40c63fe5fa", 1200),
  video: u("1611892440504-42a792e24d32", 2000),
};

export const NAV_LEFT = [
  { label: "Home", href: "#top" },
  { label: "Rooms", href: "#rooms" },
  { label: "Services", href: "#services" },
  { label: "Story", href: "#story" },
];
export const NAV_RIGHT = [
  { label: "Facilities", href: "#facilities" },
  { label: "Gallery", href: "#gallery" },
  { label: "Blog", href: "#journal" },
  { label: "Contact", href: "#contact" },
];

export const ROOMS = [
  {
    tag: "Standard",
    name: "Classic Room",
    price: 3499,
    img: u("1631049307264-da0ec9d70304"),
    size: "30 Sq.ft",
    bed: "1 Bed",
    guests: "2 Guests",
  },
  {
    tag: "Premium",
    name: "Deluxe Room",
    price: 4999,
    img: u("1582719478250-c89cae4dc85b"),
    size: "45 Sq.ft",
    bed: "1 King Bed",
    guests: "2 Guests",
  },
  {
    tag: "Suite",
    name: "Penthouse Suite",
    price: 8999,
    img: u("1590490360182-c33d57733427"),
    size: "80 Sq.ft",
    bed: "2 Beds",
    guests: "4 Guests",
  },
];

export const SERVICES = [
  {
    n: "01",
    title: "Restaurant",
    text: "From morning chai to a candlelit dinner, our multi-cuisine restaurant serves fresh, locally sourced flavours all day.",
  },
  {
    n: "02",
    title: "Banquet Hall",
    text: "An elegant hall for weddings, receptions and celebrations, with dedicated planners and in-house catering.",
  },
  {
    n: "03",
    title: "Conference Room",
    text: "Fully equipped meeting spaces with high-speed Wi-Fi, AV systems and on-call business support.",
  },
  {
    n: "04",
    title: "Laundry and Parking",
    text: "Same-day laundry and pressing, plus secure on-site parking with valet assistance for every guest.",
  },
];

export const FACILITIES = [
  {
    title: "Exclusive Suites",
    text: "Spacious suites with curated interiors, private lounges and sweeping city views.",
    img: u("1618773928121-c32242e63f39", 800),
  },
  {
    title: "Banquet Hall",
    text: "A grand setting for celebrations of every size, styled to your vision.",
    img: u("1519167758481-83f550bb49b3", 800),
  },
  {
    title: "Infinity Pools",
    text: "Unwind beside a shimmering pool with loungers, cabanas and poolside service.",
    img: u("1571896349842-33c89424de2d", 800),
  },
  {
    title: "Conference Room",
    text: "Modern boardrooms designed for focused meetings and seamless presentations.",
    img: u("1497366216548-37526070297c", 800),
  },
  {
    title: "24/7 Hotel Staff",
    text: "A warm, attentive team ready around the clock to make your stay effortless.",
    img: u("1507679799987-c73779587ccf", 800),
  },
];

export const REVIEWS = [
  {
    text: "Everything about the stay was wonderful. The room was spotless, the staff were warm and the breakfast spread was the best we've had in the city.",
    name: "Rashmi Ambrose",
    place: "Jaipur, India",
    room: "Deluxe Room",
  },
  {
    text: "Beautiful interiors and a genuinely calm atmosphere. The banquet team handled our family function flawlessly from start to finish.",
    name: "Karan Mehta",
    place: "Mumbai, India",
    room: "Penthouse Suite",
  },
  {
    text: "Perfect location for business travel. Fast Wi-Fi, a quiet conference room and a front desk that remembered our preferences.",
    name: "Sophie Larsen",
    place: "Copenhagen, Denmark",
    room: "Classic Room",
  },
  {
    text: "The pool, the food and the service were all top notch. Our kids loved it and we're already planning our next visit.",
    name: "Ananya Iyer",
    place: "Bengaluru, India",
    room: "Deluxe Room",
  },
  {
    text: "A place that truly feels worth staying. Thoughtful touches everywhere, from the welcome drink to the turndown service.",
    name: "David Okafor",
    place: "London, UK",
    room: "Penthouse Suite",
  },
  {
    text: "Great value for the quality. Rooms are modern and elegant, and checkout was quick and hassle-free.",
    name: "Priya Sharma",
    place: "Delhi, India",
    room: "Classic Room",
  },
];

export const GALLERY = [
  { src: u("1445019980597-93fa8acb246c", 1400), alt: "Hotel facade at dusk", cls: "g-a" },
  { src: u("1578683010236-d716f9a3f461", 900), alt: "Suite interior", cls: "g-b" },
  { src: u("1517248135467-4c7edcad34c4", 900), alt: "Restaurant", cls: "g-c" },
  { src: u("1505693416388-ac5ce068fe85", 900), alt: "Bedroom", cls: "g-d" },
  { src: u("1600566753190-17f0baa2a6c3", 900), alt: "Lounge", cls: "g-e" },
  { src: u("1520250497591-112f2f40a3f4", 900), alt: "Pool", cls: "g-f" },
];

export const POSTS = [
  {
    title: "A Local Guide to the Neighbourhood",
    text: "Our favourite cafés, markets and heritage walks, all within a short drive of the hotel.",
    date: "Oct 12, 2026",
    img: u("1566073771259-6a8506099945", 900),
  },
  {
    title: "Planning the Perfect Banquet",
    text: "From décor to menus, our events team shares tips for celebrations guests remember.",
    date: "Oct 04, 2026",
    img: u("1467269204594-9661b134dd2b", 900),
  },
  {
    title: "Breakfast in Bed, Done Right",
    text: "Inside our kitchen: the seasonal ingredients behind our much-loved morning menu.",
    date: "Sep 26, 2026",
    img: u("1544025162-d76694265947", 900),
  },
];

export const FOOTER_COLS = [
  { title: "Classic Room", links: ["Book for Two People", "Book for Three People", "Book for Four People"] },
  { title: "Deluxe Room", links: ["Book for Two People", "Book for Three People", "Book for Four People"] },
  { title: "Penthouse Suite", links: ["Book for Two People", "Book for Three People", "Book for Four People"] },
  { title: "Navigate", links: ["Rooms", "Services", "Facilities", "Gallery", "About", "Contact"] },
];
