import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, Clock3, MapPin, Menu, Phone, Quote, X } from 'lucide-react';

const address = '31 Centre Point, bh Raymond Shop, SB - 30, RC Dutt Rd, opp. Bank Of, Vishwas Colony, Alkapuri, Vadodara, Gujarat 390007';
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
const telUrl = 'tel:09974888295';

const categories = [
  { name: 'Sarees', note: 'Elegant sarees for traditional, festive and special occasions.', number: '01', image: '/images/editorial-hero.jpg', alt: 'Editorial saree inspiration' },
  { name: 'Choli & Chaniya', note: 'Traditional ethnic styles for celebrations and festive occasions.', number: '02', image: '/images/editorial-chaniya.jpg', alt: 'Editorial choli and chaniya inspiration' },
  { name: 'Gowns', note: 'Stylish Indian gowns for statement looks.', number: '03', image: '/images/editorial-chaniya.jpg', alt: 'Editorial Indian occasionwear inspiration' },
  { name: 'Dresses', note: 'A variety of ethnic and contemporary dress styles.', number: '04', image: '/images/editorial-hero.jpg', alt: 'Editorial Indian clothing inspiration' },
  { name: "Men's Kurtas", note: "Ethnic options for men's festive and traditional dressing.", number: '05', image: '/images/editorial-kurta.jpg', alt: 'Editorial menswear inspiration' },
  { name: 'Blouses', note: 'Complete your saree and ethnic look with blouse options.', number: '06', image: '/images/editorial-chaniya.jpg', alt: 'Editorial ethnic outfit inspiration' },
  { name: 'Dupattas', note: 'Versatile ethnic styling pieces.', number: '07', image: '/images/editorial-hero.jpg', alt: 'Editorial saree and drape inspiration' },
];

const gallery = [
  { src: '/images/editorial-hero.jpg', alt: 'Editorial inspiration: a maroon saree in a sunlit heritage corridor', label: 'The enduring drape', className: 'gallery-tall' },
  { src: '/images/editorial-chaniya.jpg', alt: 'Editorial inspiration: an ivory and rose chaniya choli in a heritage courtyard', label: 'Colour in motion', className: 'gallery-wide' },
  { src: '/images/editorial-kurta.jpg', alt: 'Editorial inspiration: an ivory kurta with a muted maroon vest', label: 'A quieter statement', className: 'gallery-tall gallery-offset' },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeImage, setActiveImage] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateScrollState = () => setScrolled(window.scrollY > 24);
    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollState);
  }, []);

  useEffect(() => {
    if (activeImage === null) return;
    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveImage(null);
      if (event.key === 'ArrowRight') setActiveImage((current) => current === null ? null : (current + 1) % gallery.length);
      if (event.key === 'ArrowLeft') setActiveImage((current) => current === null ? null : (current + gallery.length - 1) % gallery.length);
      if (event.key === 'Tab' && dialogRef.current) {
        const items = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('button:not(:disabled)'));
        const first = items[0];
        const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeImage]);

  useEffect(() => {
    if (!menuOpen) return;
    mobileNavRef.current?.querySelector('a')?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const openFacebookUnavailable = () => {
    document.getElementById('social')?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <div className="site-shell grain">
      <div className="topline">
        <span>Alkapuri · Vadodara</span>
        <span className="topline-center">A considered edit of Indian occasionwear</span>
        <a href={telUrl} aria-label="Call Rajwada Ethnic Studio">Call the studio <ArrowUpRight size={13} /></a>
      </div>
      <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
        <a className="brand" href="#home" aria-label="Rajwada Ethnic Studio home" onClick={closeMenu}>
          <span className="brand-mark" aria-hidden="true">R</span>
          <span className="brand-copy"><strong>RAJWADA</strong><small>ETHNIC STUDIO</small></span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a className="nav-link" href="#home">Home</a>
          <a className="nav-link" href="#collections">Collections</a>
          <a className="nav-link" href="#story">About</a>
          <a className="nav-link" href="#reviews">Reviews</a>
          <a className="nav-link" href="#inspiration">Gallery</a>
          <a className="nav-link" href="#visit">Visit Us</a>
          <a className="nav-link" href="#contact">Contact</a>
        </nav>
        <a className="header-visit" href={mapsUrl} target="_blank" rel="noreferrer">Visit Store <ArrowUpRight size={15} /></a>
        <button ref={menuButtonRef} className="menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={() => setMenuOpen((open) => !open)} data-testid="button-mobile-menu">
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>
      {menuOpen && <div id="mobile-nav" ref={mobileNavRef} className="mobile-nav">
        <a href="#home" onClick={closeMenu}>Home <ArrowUpRight size={15} /></a>
        <a href="#collections" onClick={closeMenu}>Collections <ArrowUpRight size={15} /></a>
        <a href="#story" onClick={closeMenu}>About <ArrowUpRight size={15} /></a>
        <a href="#reviews" onClick={closeMenu}>Reviews <ArrowUpRight size={15} /></a>
        <a href="#inspiration" onClick={closeMenu}>Gallery <ArrowUpRight size={15} /></a>
        <a href="#visit" onClick={closeMenu}>Visit Us <ArrowUpRight size={15} /></a>
        <a href="#contact" onClick={closeMenu}>Contact <ArrowUpRight size={15} /></a>
        <a href={telUrl}>Call the studio <Phone size={15} /></a>
      </div>}

      <main>
        <section className="hero" id="home" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="eyebrow ornament rise">A wardrobe of Indian expression</div>
            <h1 id="hero-title" className="serif rise rise-delay">Style That<br /><em>Celebrates</em><br />Tradition</h1>
            <p className="hero-description rise rise-delay-2">Discover sarees, choli, gowns, dresses, men's kurtas, blouses, chaniya and dupattas at Rajwada Ethnic Studio, Alkapuri, Vadodara.</p>
            <div className="hero-actions rise rise-delay-2">
              <a className="button button-maroon" href="#collections">Explore Collections <ArrowDown size={16} /></a>
              <a className="text-link" href={mapsUrl} target="_blank" rel="noreferrer">Visit Our Store <ArrowUpRight size={15} /></a>
              <a className="text-link hero-call" href={telUrl}>Call 099748 88295 <Phone size={14} /></a>
            </div>
            <div className="hero-trust">
              <div className="trust-item"><strong>3.5K+</strong><span>Google Reviews</span></div>
              <div className="trust-rule" />
              <div className="trust-item"><strong>3.7<span className="trust-small">/5</span></strong><span>Justdial · 47 votes</span></div>
              <div className="trust-rule" />
              <div className="trust-item hours"><span className="open-dot" /> <span>Open · Closes 8:30 PM</span></div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-frame">
              <img className="hero-image" src="/images/editorial-hero.jpg" alt="Editorial fashion inspiration: a maroon saree in the warm light of a heritage corridor" width="960" height="1200" fetchPriority="high" />
              <span className="image-caption">An expression of you</span>
            </div>
            <div className="hero-side-note"><span>01 / 08</span><span>Tradition, in its many forms</span></div>
            <div className="hero-seal" aria-label="Style for every expression"><span>STYLE FOR<br />EVERY<br />EXPRESSION</span><i>✳</i></div>
          </div>
          <div className="hero-bottomline"><span>RAJWADA ETHNIC STUDIO</span><span>31 CENTRE POINT, ALKAPURI</span><span>SCROLL TO DISCOVER <ArrowDown size={13} /></span></div>
        </section>

        <section className="intro-section section-pad" id="story">
          <div className="intro-label"><span className="eyebrow">About Rajwada</span><span className="section-index">Alkapuri · Vadodara</span></div>
          <div className="intro-body">
            <h2 className="serif">Your Destination<br />for <em>Ethnic Style</em></h2>
            <div className="intro-aside">
              <p>Rajwada Ethnic Studio serves customers as a wholesaler and retailer with a wide range of ethnic and traditional clothing: sarees, choli, gowns, dresses, men's kurtas, blouses, chaniya and dupattas.</p>
              <a className="text-link" href="#collections">Meet the collection <ArrowDown size={15} /></a>
            </div>
          </div>
          <div className="intro-stats">
            <div><span className="eyebrow">A broad wardrobe</span><strong>8</strong><span>ways to find your style</span></div>
            <div><span className="eyebrow">Here in</span><strong>Alkapuri</strong><span>Vadodara, Gujarat</span></div>
            <div><span className="eyebrow">Come by</span><strong>Today</strong><span>Open · Closes 8:30 PM</span></div>
          </div>
        </section>

        <section className="experience-section section-pad" aria-labelledby="experience-title">
          <div className="experience-copy">
            <span className="eyebrow">A considered range for every occasion</span>
            <h2 id="experience-title" className="serif">More Variety.<br /><em>More Possibilities.</em></h2>
            <p>From everyday ethnic wear to festive dressing, explore styles for different occasions, personalities and preferences.</p>
            <a className="text-link" href="#collections">Explore Collections <ArrowDown size={15} /></a>
          </div>
          <div className="experience-images">
            <figure className="experience-image-main">
              <img src="/images/editorial-chaniya.jpg" alt="Editorial inspiration: festive Indian ethnicwear in a heritage courtyard" width="900" height="1125" loading="lazy" />
              <figcaption>Editorial inspiration · not Rajwada inventory</figcaption>
            </figure>
            <figure className="experience-image-secondary">
              <img src="/images/editorial-kurta.jpg" alt="Editorial inspiration: men's ethnicwear in a heritage doorway" width="900" height="1125" loading="lazy" />
            </figure>
          </div>
        </section>

        <section className="collections-section section-pad" id="collections">
          <div className="section-heading">
            <div><span className="eyebrow">Find your kind of tradition</span><h2 className="serif">Explore the Collection</h2></div>
            <p>One destination, many ways to dress.<br />Take a look around.</p>
          </div>
          <div className="collection-layout">
            <div className="collection-feature">
              <img src="/images/editorial-chaniya.jpg" alt="Editorial inspiration of a chaniya choli in an old courtyard" width="1200" height="800" loading="lazy" />
              <div className="feature-shade" />
              <div className="feature-copy"><span className="eyebrow">A moment in colour</span><span className="serif">Dress for<br />the feeling.</span><span className="feature-foot">Explore occasionwear <ArrowUpRight size={15} /></span></div>
              <span className="image-disclaimer">Editorial inspiration · not Rajwada inventory</span>
            </div>
            <div className="category-list" aria-label="Clothing categories">
              {categories.map((category) => <a className="category-row" href={mapsUrl} target="_blank" rel="noreferrer" key={category.name} aria-label={`Discover ${category.name} at Rajwada Ethnic Studio`}>
                <img className="category-thumbnail" src={category.image} alt={category.alt} width="84" height="96" loading="lazy" />
                <span className="category-copy">
                  <span className="category-number">{category.number}</span>
                  <span className="category-title serif">{category.name}</span>
                  <span className="category-note">{category.note}</span>
                </span>
                <span className="category-arrow"><span>Discover</span><ArrowUpRight size={17} /></span>
              </a>)}
              <p className="category-footnote">Illustrative fashion imagery only, not current inventory. Visit the studio to discover the range in person.</p>
            </div>
          </div>
        </section>

        <section className="quote-band">
          <div className="quote-band-inner">
            <span className="quote-mark serif">“</span>
            <p className="serif">The best outfit is the one that lets you<br className="desktop-break" /> feel most like <em>yourself.</em></p>
            <span className="quote-band-note">A little inspiration for your next visit</span>
          </div>
          <div className="quote-band-art" aria-hidden="true"><span>✳</span><span>✳</span><span>✳</span></div>
        </section>

        <section className="reasons section-pad">
          <div className="reasons-heading">
            <span className="eyebrow">A considered place to discover</span>
            <h2 className="serif">Why Shop at Rajwada Ethnic Studio?</h2>
          </div>
          <div className="reason-list">
            <article className="reason-item"><span className="reason-count">01</span><div><h3 className="serif">Wide Variety</h3><p>A broad selection across sarees, ethnic wear, dresses and more.</p></div><Check size={17} /></article>
            <article className="reason-item"><span className="reason-count">02</span><div><h3 className="serif">Value-Focused Shopping</h3><p>Customer feedback highlights reasonable and budget-friendly options.</p></div><Check size={17} /></article>
            <article className="reason-item"><span className="reason-count">03</span><div><h3 className="serif">Men & Women</h3><p>Ethnic clothing options across men's and women's categories.</p></div><Check size={17} /></article>
            <article className="reason-item"><span className="reason-count">04</span><div><h3 className="serif">Wholesale & Retail</h3><p>Rajwada Ethnic Studio serves both wholesale and retail customers.</p></div><Check size={17} /></article>
          </div>
        </section>

        <section className="gallery-section section-pad" id="inspiration">
          <div className="gallery-heading">
            <div><span className="eyebrow">A glimpse of the feeling</span><h2 className="serif">Ways to <em>wear it.</em></h2></div>
            <p>Fashion editorial for inspiration.<br />Images are not of Rajwada's store or inventory.</p>
          </div>
          <div className="gallery-grid">
            {gallery.map((image, index) => <button className={`gallery-card ${image.className}`} key={image.src} type="button" onClick={() => setActiveImage(index)} aria-label={`Open image: ${image.label}`}>
              <span className="gallery-photo"><img className="gallery-image" src={image.src} alt={image.alt} width="900" height="1125" loading="lazy" /></span>
              <span className="gallery-label"><span className="serif">{image.label}</span><span className="gallery-expand" aria-hidden="true"><ArrowUpRight size={17} /></span></span>
            </button>)}
          </div>
          <p className="gallery-disclaimer">Visual references are editorial inspiration only. They do not represent Rajwada Ethnic Studio photography or available inventory.</p>
        </section>

        <section className="reviews-section section-pad" id="reviews">
          <div className="reviews-top"><div><span className="eyebrow">Words from shoppers</span><h2 className="serif">What Customers Say</h2></div>
            <div className="reviews-trust"><div><strong>3.5K+</strong><span>Google Reviews</span></div><i /><div><strong>3.7<span>/5</span></strong><span>Justdial · 47 votes</span></div></div></div>
          <div className="review-cards">
            <article className="review-card"><Quote size={25} strokeWidth={1.2} /><blockquote>“Good collection at reasonable price and lot of variety option.”</blockquote><div className="review-byline"><span className="review-avatar">AW</span><div><strong>ANJU WAGHELA</strong><span>Shopper review</span></div></div></article>
            <article className="review-card"><Quote size={25} strokeWidth={1.2} /><blockquote>“Budget friendly store for regular wear clothing.”</blockquote><div className="review-byline"><span className="review-avatar">JS</span><div><strong>jhanvi singh singh</strong><span>Shopper review</span></div></div></article>
          </div>
          <p className="review-source">Customer comments shown verbatim. Review counts and platform labels are presented separately.</p>
        </section>

        <section className="social-section section-pad" id="social">
          <div className="social-emblem" aria-hidden="true"><span>R</span><i>✳</i></div>
          <div className="social-copy"><span className="eyebrow">Stay in touch</span><h2 className="serif">Stay Connected<br /><em>With Rajwada</em></h2><p>Discover the latest ethnic styles, store updates and fashion inspiration.</p></div>
          <div className="social-action"><button className="button button-outline unavailable" type="button" disabled aria-disabled="true" title="Facebook profile link not provided">Facebook profile unavailable <ArrowUpRight size={16} /></button><span>No profile link supplied</span></div>
        </section>

        <section className="visit-section" id="visit">
          <div className="visit-image-wrap"><img src="/images/editorial-kurta.jpg" alt="Editorial inspiration: menswear in a heritage doorway" width="900" height="1125" loading="lazy" /><span className="visit-image-caption">Editorial inspiration</span></div>
          <div className="visit-content">
            <span className="eyebrow">The door is open</span>
            <h2 className="serif">Come Discover<br /><em>Your Style</em></h2>
            <p className="visit-intro">Visit Rajwada Ethnic Studio in Alkapuri, Vadodara and explore the collection in person.</p>
            <div className="visit-address"><MapPin size={18} /><div><strong>Rajwada Ethnic Studio</strong><address>{address}</address></div></div>
            <div className="visit-hours"><Clock3 size={18} /><span>Open · Closes 8:30 PM</span></div>
            <div className="visit-buttons"><a className="button button-maroon" href={mapsUrl} target="_blank" rel="noreferrer">Get directions <ArrowUpRight size={16} /></a><a className="button button-light" href={telUrl}>Call 099748 88295 <Phone size={15} /></a></div>
            <span className="visit-note">A local destination in Alkapuri, Vadodara</span>
          </div>
        </section>

        <section className="contact-section section-pad" id="contact" aria-labelledby="contact-title">
          <div className="contact-heading">
            <span className="eyebrow">Plan a visit or give us a call</span>
            <h2 id="contact-title" className="serif">Contact Rajwada<br /><em>Ethnic Studio</em></h2>
          </div>
          <div className="contact-details">
            <div className="contact-detail"><span className="eyebrow">Visit</span><strong>Alkapuri, Vadodara</strong><span>31 Centre Point, RC Dutt Road</span></div>
            <div className="contact-detail"><span className="eyebrow">Call</span><a href={telUrl}>099748 88295</a></div>
            <div className="contact-detail"><span className="eyebrow">Hours</span><strong>Open · Closes 8:30 PM</strong></div>
            <div className="contact-actions">
              <a className="button button-maroon" href={telUrl}>Call Now <Phone size={15} /></a>
              <a className="button button-light" href={mapsUrl} target="_blank" rel="noreferrer">Get Directions <ArrowUpRight size={15} /></a>
            </div>
          </div>
        </section>

        <section className="closing-line">
          <span className="eyebrow">An invitation to explore</span>
          <h2 className="serif">Tradition is <em>always becoming.</em></h2>
          <a href="#collections" className="text-link">Return to the collection <ArrowUpRight size={15} /></a>
        </section>
      </main>

      <footer className="footer">
        <a className="brand footer-brand" href="#home" aria-label="Rajwada Ethnic Studio home"><span className="brand-mark">R</span><span className="brand-copy"><strong>RAJWADA</strong><small>ETHNIC STUDIO</small></span></a>
        <span className="footer-address">31 Centre Point · Alkapuri, Vadodara</span>
        <div className="footer-links"><a href="#collections">Collections</a><a href={mapsUrl} target="_blank" rel="noreferrer">Directions</a><a href={telUrl}>Call</a><button type="button" disabled title="Facebook profile link not provided">Facebook unavailable</button></div>
        <span className="copyright">© Rajwada Ethnic Studio</span>
      </footer>

      <div className="mobile-actions" aria-label="Quick actions">
        <a href={telUrl}><Phone size={17} /><span>Call</span></a>
        <a href={mapsUrl} target="_blank" rel="noreferrer"><MapPin size={17} /><span>Directions</span></a>
        <button type="button" onClick={openFacebookUnavailable} aria-label="Facebook profile unavailable"><span className="facebook-f">f</span><span>Facebook</span></button>
      </div>

      {activeImage !== null && <div ref={dialogRef} className="lightbox" role="dialog" aria-modal="true" aria-label="Editorial fashion image viewer" onMouseDown={(event) => { if (event.target === event.currentTarget) setActiveImage(null); }}>
        <button className="lightbox-close" type="button" ref={closeButtonRef} onClick={() => setActiveImage(null)} aria-label="Close image viewer"><X size={22} /></button>
        <button className="lightbox-prev" type="button" onClick={() => setActiveImage((activeImage + gallery.length - 1) % gallery.length)} aria-label="Previous image"><ArrowLeft size={22} /></button>
        <figure><img src={gallery[activeImage].src} alt={gallery[activeImage].alt} /><figcaption><span>{gallery[activeImage].label}</span><small>Editorial inspiration · not Rajwada inventory</small></figcaption></figure>
        <button className="lightbox-next" type="button" onClick={() => setActiveImage((activeImage + 1) % gallery.length)} aria-label="Next image"><ArrowRight size={22} /></button>
      </div>}
    </div>
  );
}

export default App;
