import { useState, useEffect } from 'react'
import { motion, useMotionValue } from 'framer-motion'

// Hero draggable images with exact positions and rotations from Framer
const heroImages = [
  {
    id: 1,
    x: '8%',
    y: '25%',
    w: 198,
    h: 157,
    rotate: -25,
    image: 'https://framerusercontent.com/images/NUTdkRLYEoKo3q0xaYuGtoBUg.jpg?scale-down-to=512'
  },
  {
    id: 2,
    x: '18%',
    y: '55%',
    w: 183,
    h: 170,
    rotate: -19,
    image: 'https://framerusercontent.com/images/v9by2y3t7Fgrb9sTYB57w099Lk.jpg?scale-down-to=512'
  },
  {
    id: 3,
    x: '72%',
    y: '15%',
    w: 142,
    h: 142,
    rotate: 12,
    image: 'https://framerusercontent.com/images/GfQF9MJTOQgip3GZt7WYQlFA.png?scale-down-to=512'
  },
  {
    id: 4,
    x: '75%',
    y: '50%',
    w: 160,
    h: 224,
    rotate: 32,
    image: 'https://framerusercontent.com/images/sOV9oVng8G6eTcJz9mcCnJarYGE.jpg?scale-down-to=512'
  },
]

// Gallery items for infinite marquee - mixed images and videos with varying heights
const galleryItems = [
  { type: 'image', src: 'https://framerusercontent.com/images/sOV9oVng8G6eTcJz9mcCnJarYGE.jpg?scale-down-to=512', width: 259, height: 363 },
  { type: 'image', src: 'https://framerusercontent.com/images/bItSXFPavhU2dit81jnbKTXR0JE.jpg?scale-down-to=512', width: 225, height: 300 },
  { type: 'video', src: 'https://framerusercontent.com/assets/2DpNdbCobj1SacO4OMpr1IvlGE.mp4', width: 280, height: 374 },
  { type: 'image', src: 'https://framerusercontent.com/images/mTIgomHRzjbLd0XLW5T7qOrhxU.jpg?scale-down-to=512', width: 232, height: 290 },
  { type: 'image', src: 'https://framerusercontent.com/images/v9by2y3t7Fgrb9sTYB57w099Lk.jpg?scale-down-to=512', width: 339, height: 315 },
  { type: 'image', src: 'https://framerusercontent.com/images/40YISsvwSJc4RxvqVYZATAMwlM.jpg?scale-down-to=512', width: 232, height: 191 },
  { type: 'image', src: 'https://framerusercontent.com/images/W6EKuDKZ6ilw7quzpU9IfkL248E.jpg?scale-down-to=512', width: 250, height: 333 },
  { type: 'image', src: 'https://framerusercontent.com/images/5gmEX58ZB6E6bhMpCUhzutgd48.jpg?scale-down-to=512', width: 266, height: 328 },
  { type: 'image', src: 'https://framerusercontent.com/images/EkqBLYkO1YzBqFZ5QtGCbxnKg.jpg?scale-down-to=512', width: 217, height: 271 },
  { type: 'image', src: 'https://framerusercontent.com/images/Hhqb6e3FMAW5LJAIbJ1sxl6Dnhg.jpg?scale-down-to=512', width: 299, height: 374 },
  { type: 'video', src: 'https://framerusercontent.com/assets/216jYTG59MjWaGTdoFmxyKeLs2Q.mp4', width: 260, height: 340 },
  { type: 'image', src: 'https://framerusercontent.com/images/c6idvUjrSpE7PPwnzZRpEBQoLiA.png', width: 200, height: 200 },
  { type: 'video', src: 'https://framerusercontent.com/assets/A4ctABxvbRaq6aq99HPazcljFA.mp4', width: 240, height: 320 },
]

// Projects with Framer data
const projects = [
  {
    id: 1,
    title: 'FinFlow',
    category: 'Product Design',
    description: 'FinFlow needed an expense tracking platform for startup teams with tight budgets. Existing tools were too complex, so I designed an MVP to provide real-time spending insights for growth and fundraising.',
    image: 'https://framerusercontent.com/images/btVfj3uYz35Jcg8udVCo6IDHPIw.jpg?scale-down-to=1024',
  },
  {
    id: 2,
    title: 'LaunchPad',
    category: 'UI & UX',
    description: 'LaunchPad wanted a website builder for founders without coding skills. I designed an intuitive platform for creating MVP landing pages and marketing sites to establish online presence quickly.',
    image: 'https://framerusercontent.com/images/I2DGsvE6BPFKwR3seUVB72UVU.png?scale-down-to=1024',
  },
  {
    id: 3,
    title: 'HealthSync',
    category: 'Product Design',
    description: 'HealthSync aimed to provide startup teams accessible telehealth for overwhelmed employees. Traditional healthcare was slow and inaccessible, so I designed an app connecting teams to virtual care.',
    image: 'https://framerusercontent.com/images/HDv7K6e7EoqUaet9WhVVKwNMpA.png?scale-down-to=1024',
  },
  {
    id: 4,
    title: 'TalentBridge',
    category: 'Visual Design',
    description: 'TalentBridge aimed to create a hiring platform for startups scaling from 5 to 50 employees. I designed a solution to simplify recruitment while ensuring quality hires.',
    image: 'https://framerusercontent.com/images/gn78wQvecZqzcGzRKWGkV3NuVE.png?scale-down-to=1024',
  },
]

// Skills with exact rotations and transforms from Framer
const skills = [
  { name: 'Framer Development', rotate: -4, transform: '' },
  { name: 'Branding', rotate: 9, transform: '' },
  { name: 'Visual Design', rotate: -15, transform: '' },
  { name: 'User Interface Design', rotate: 7, transform: '' },
  { name: 'Product Design', rotate: -10, transform: 'translateX(-50%)' },
  { name: 'User Experience Design', rotate: -9, transform: '' },
  { name: 'User Research', rotate: -7, transform: 'translateY(-50%)' },
  { name: 'Pitch Deck Design', rotate: 3, transform: '' },
  { name: 'Design Systems', rotate: 8, transform: '' },
]

// Draggable Image Component
function DraggableImage({ item }: { item: typeof heroImages[0] }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const [isDragging, setIsDragging] = useState(false)

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.1}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      style={{
        x,
        y,
        position: 'absolute',
        left: item.x,
        top: item.y,
        width: item.w,
        height: item.h,
        rotate: item.rotate,
        zIndex: isDragging ? 100 : 10,
        cursor: 'grab',
      }}
      whileDrag={{
        cursor: 'grabbing',
        scale: 1.05,
        boxShadow: '0 25px 50px -12px rgba(0, 22, 102, 0.3)'
      }}
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: item.id * 0.15 }}
      className="select-none rounded-lg overflow-hidden shadow-xl"
    >
      <img
        src={item.image}
        alt={`Design ${item.id}`}
        className="w-full h-full object-cover"
        draggable={false}
      />
    </motion.div>
  )
}

// Arc Text Component - "This is Artemis"
function ArcText() {
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => prev + 0.5)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="absolute w-40 h-40"
      style={{
        left: '50%',
        top: '35%',
        transform: 'translate(-50%, -50%)',
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <defs>
          <path
            id="textCircle"
            d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
            fill="none"
          />
        </defs>
        <text
          className="text-[4px] tracking-[0.15em]"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fill: '#2A3132',
            fontWeight: 400,
          }}
        >
          <textPath href="#textCircle" startOffset="0%">
            This is Artemis • This is Artemis • This is Artemis •
          </textPath>
        </text>
      </svg>
    </motion.div>
  )
}

// Navigation Header
function Header() {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 py-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <nav className="w-full flex items-center justify-center gap-10">
        <motion.a
          href="#works"
          className="text-sm font-medium text-[#2A3132] hover:text-[#001666] transition-colors"
          whileHover={{ y: -2 }}
        >
          Works
        </motion.a>

        <motion.div
          className="text-center"
          whileHover={{ scale: 1.02 }}
        >
          <a href="#" className="block">
            <span
              className="text-xl text-[#001666] block leading-tight"
              style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}
            >
              Artemis &
            </span>
            <span
              className="text-lg text-[#001666] block leading-tight"
              style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}
            >
              Artemis
            </span>
          </a>
        </motion.div>

        <motion.a
          href="#playground"
          className="text-sm font-medium text-[#2A3132] hover:text-[#001666] transition-colors"
          whileHover={{ y: -2 }}
        >
          Playground
        </motion.a>
      </nav>
    </motion.header>
  )
}

// Hero Section
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Floating Draggable Images */}
      <div className="absolute inset-0">
        {heroImages.map((item) => (
          <DraggableImage key={item.id} item={item} />
        ))}
      </div>

      {/* Arc Text */}
      <ArcText />

      {/* Center Content */}
      <div className="relative z-20 text-center max-w-4xl mx-auto px-8">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-[80px] leading-[1.05] text-[#001666] mb-4"
          style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontWeight: 400 }}
        >
          <span className="inline-block">Product</span>{' '}
          <span className="inline-block">&</span>{' '}
          <span className="inline-block">Visual</span>
          <br />
          <span className="inline-block">Designer</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-base md:text-lg text-[#2A3132] mb-8"
        >
          startups can count on!
        </motion.p>

        <motion.a
          href="#contact"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 text-[#F8F9FA] font-medium text-sm"
          style={{
            backgroundColor: '#FF5900',
            padding: '12px 24px',
            borderRadius: '99px',
          }}
        >
          Get Started
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </motion.a>
      </div>
    </section>
  )
}

// Telescope Icon
function TelescopeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#001666]">
      <path d="m10.065 12.493-6.18 1.318a.934.934 0 0 1-1.108-.702l-.537-2.15a1.07 1.07 0 0 1 .691-1.265l13.504-4.44" />
      <path d="m13.56 11.747 4.332-.924" />
      <path d="m16 21-3.105-6.21" />
      <path d="M16.485 5.94a2 2 0 0 1 1.455-2.425l1.09-.272a1 1 0 0 1 1.212.727l1.515 6.06a1 1 0 0 1-.727 1.213l-1.09.272a2 2 0 0 1-2.425-1.455z" />
      <path d="m6.158 8.633 1.114 4.456" />
      <path d="m8 21 3.105-6.21" />
    </svg>
  )
}

// Marquee Item Component
function MarqueeItem({ item, index }: { item: typeof galleryItems[0], index: number }) {
  return (
    <div
      className="flex-shrink-0 rounded-lg overflow-hidden"
      style={{ width: item.width, height: item.height }}
    >
      {item.type === 'video' ? (
        <video
          src={item.src}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      ) : (
        <img
          src={item.src}
          alt={`Gallery ${index + 1}`}
          className="w-full h-full object-cover"
        />
      )}
    </div>
  )
}

// Sneak Peak Gallery Section - Infinite Marquee
function SneakPeakSection() {
  return (
    <section id="sneak-peak" className="py-24 overflow-hidden">
      {/* Section Title */}
      <motion.div
        className="flex items-center justify-center gap-3 mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <TelescopeIcon />
        <h2
          className="text-3xl md:text-4xl text-[#001666]"
          style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}
        >
          Sneak peak of my works
        </h2>
      </motion.div>

      {/* Infinite Marquee */}
      <div className="relative">
        <motion.div
          className="flex items-end gap-6"
          animate={{ x: [0, -4311] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40,
              ease: "linear",
            },
          }}
        >
          {/* First set */}
          {galleryItems.map((item, index) => (
            <MarqueeItem key={`set1-${index}`} item={item} index={index} />
          ))}
          {/* Duplicate for seamless loop */}
          {galleryItems.map((item, index) => (
            <MarqueeItem key={`set2-${index}`} item={item} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Project Card Component
function ProjectCard({ project, index }: { project: typeof projects[0], index: number }) {
  return (
    <motion.a
      href="#"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="block no-underline group"
    >
      {/* Card Container */}
      <div className="bg-cream-dark rounded-2xl p-3 flex flex-col w-full border border-cream-dark">
        {/* Cover Mask */}
        <div className="rounded-lg overflow-hidden w-full aspect-[4/3]">
          <img
            src={project.image}
            alt={project.title}
            className="block w-full h-full object-cover object-center"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col pt-4 px-1 pb-1 gap-4">
          {/* Project Info */}
          <div className="flex flex-col gap-2">
            <h5 className="text-lg font-semibold text-dark-gray m-0 text-left">
              {project.title}
            </h5>
            <p className="text-sm text-gray m-0 leading-relaxed text-left">
              {project.description}
            </p>
          </div>

          {/* Category & Icon Row */}
          <div className="flex items-center justify-between">
            <span className="bg-dark-gray text-cream py-1.5 px-3.5 rounded-[20px] text-xs font-medium">
              {project.category}
            </span>
            <div className="w-8 h-8 bg-dark-gray rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </motion.a>
  )
}

// Works Section
function WorksSection() {
  return (
    <section id="works" className="py-24 w-full">
      <div className="w-full flex flex-col items-center justify-center">
        {/* Section Title */}
        <motion.div
          className="text-center mb-16 px-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2
            className="text-4xl md:text-5xl text-dark-blue mb-3 font-serif italic"
          >
            Design in action
          </h2>
          <p className="text-base text-gray-light">
            Crafting functional, stunning products with founders.
          </p>
        </motion.div>

        {/* Project Cards - Grid 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-[1020px] px-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Load More Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-orange text-cream font-medium text-sm py-3 px-6 rounded-full"
          >
            Load More
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

// Star Icon - matching Framer
function StarIcon() {
  return (
    <svg width="25" height="25" viewBox="0 0 25 25" fill="#001666">
      <path d="M12.5 0L15.5 9.5L25 12.5L15.5 15.5L12.5 25L9.5 15.5L0 12.5L9.5 9.5L12.5 0Z" />
    </svg>
  )
}

// Ability Section
function AbilitySection() {
  return (
    <section id="ability" className="py-24 px-6 w-full flex flex-col items-center justify-center">
      {/* Tags Container */}
      <div className="flex flex-wrap gap-4 justify-center items-center max-w-[900px] mb-12">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.1, rotate: 0 }}
            className="bg-light-blue rounded-[70px] py-3 px-6 cursor-pointer"
            style={{
              transform: `${skill.transform} rotate(${skill.rotate}deg)`,
            }}
          >
            <span className="text-dark-blue text-sm font-medium whitespace-nowrap">{skill.name}</span>
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="flex flex-col items-center justify-center text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <StarIcon />
          <h2 className="text-4xl md:text-5xl text-dark-blue font-serif italic m-0">
            What I bring to the table
          </h2>
        </div>
        <p className="text-base text-gray-light m-0 max-w-[500px] leading-relaxed">
          Digital experiences that engage users and help your startup stand out from day one
        </p>
      </div>
    </section>
  )
}

// Contact Section
function ContactSection() {
  return (
    <section id="contact" className="py-32 px-8 md:px-16">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl text-[#001666] mb-6"
          style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}
        >
          Let's Work<br />Together
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-[#2A3132]/70 mb-12"
        >
          Have a project in mind? Let's create something amazing.
        </motion.p>
        <motion.a
          href="mailto:hello@artemis.design"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 text-[#F8F6F3] font-medium text-base"
          style={{
            backgroundColor: '#FF5900',
            padding: '14px 28px',
            borderRadius: '99px',
          }}
        >
          Get in Touch
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </motion.a>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  return (
    <footer className="py-8 px-8 border-t border-[#001666]/10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-[#2A3132]/50">
          © 2025 Artemis. All rights reserved.
        </p>
        <div className="flex gap-6">
          {['Twitter', 'LinkedIn', 'Dribbble', 'Behance'].map((social) => (
            <a
              key={social}
              href="#"
              className="text-sm text-[#2A3132]/50 hover:text-[#001666] transition-colors"
            >
              {social}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

// Main App
function App() {
  return (
    <div className="min-h-screen bg-[#F8F6F3]">
      <Header />
      <HeroSection />
      <div className="h-40 md:h-56" />
      <SneakPeakSection />
      <div className="h-40 md:h-56" />
      <WorksSection />
      <div className="h-40 md:h-56" />
      <AbilitySection />
      <div className="h-40 md:h-56" />
      <ContactSection />
      <Footer />
    </div>
  )
}

export default App
