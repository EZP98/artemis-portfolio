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

// Skills
const skills = [
  { name: 'UI Design', rotate: -5 },
  { name: 'UX Research', rotate: 3 },
  { name: 'Prototyping', rotate: -3 },
  { name: 'Design Systems', rotate: 6 },
  { name: 'Figma', rotate: -4 },
  { name: 'Framer', rotate: 2 },
  { name: 'Motion Design', rotate: -6 },
  { name: 'User Testing', rotate: 4 },
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
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 bg-[#FF5900] text-[#F8F9FA] px-6 py-3 rounded-full font-medium text-sm"
        >
          Get Started
          <div className="w-5 h-5 flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </div>
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
    <section id="sneak-peak" className="py-32 mt-20 overflow-hidden">
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
      className="block group"
    >
      <div
        className="rounded-[16px] overflow-hidden"
        style={{
          backgroundColor: '#EBE9E4',
          border: '1px solid #EBE9E4',
        }}
      >
        {/* Cover Image Mask */}
        <div className="p-3 pb-0">
          <div className="overflow-hidden rounded-lg">
            <img
              src={project.image}
              alt={project.title}
              className="w-full aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-4 pt-3">
          {/* Project Info */}
          <div className="mb-4">
            <h5 className="text-lg font-semibold text-[#2A3132] mb-2">
              {project.title}
            </h5>
            <p className="text-sm text-[#767D7E] leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Category Badge & Icon */}
          <div className="flex items-center justify-between">
            <span
              className="inline-block text-xs font-medium rounded-[20px]"
              style={{
                backgroundColor: '#2A3132',
                color: '#F8F6F3',
                padding: '5px 14px 6px 14px'
              }}
            >
              {project.category}
            </span>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ backgroundColor: '#2A3132' }}
            >
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
    <section id="works" className="py-16 px-8">
      <div className="max-w-5xl mx-auto">
        {/* Section Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2
            className="text-4xl md:text-5xl text-[#001666] mb-3"
            style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}
          >
            Design in action
          </h2>
          <p className="text-base text-[#5F6566]">
            Crafting functional, stunning products with founders.
          </p>
        </motion.div>

        {/* Project Cards - Grid 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Load More Button */}
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#FF5900] text-white px-8 py-3 rounded-full font-medium text-sm"
          >
            Load More
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

// Ability Section
function AbilitySection() {
  return (
    <section className="py-32 mt-20 px-8 bg-[#001666]">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl text-white mb-4"
          style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}
        >
          My Abilities
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-white/60 mb-16"
        >
          Tools & skills I bring to the table
        </motion.p>

        <div className="flex flex-wrap gap-4 justify-center">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.1, rotate: 0 }}
              style={{ rotate: skill.rotate }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full"
            >
              <span className="text-white font-medium">{skill.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Contact Section
function ContactSection() {
  return (
    <section id="contact" className="py-32 px-8">
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
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-3 bg-[#FF5900] text-white px-10 py-5 rounded-full font-medium text-lg shadow-lg hover:shadow-xl transition-shadow"
        >
          Get in Touch
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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

// Spacer Component
function Spacer() {
  return <div className="h-24 md:h-32" />
}

// Main App
function App() {
  return (
    <div className="min-h-screen bg-[#F8F6F3]">
      <Header />
      <HeroSection />
      <Spacer />
      <SneakPeakSection />
      <Spacer />
      <WorksSection />
      <Spacer />
      <AbilitySection />
      <Spacer />
      <ContactSection />
      <Footer />
    </div>
  )
}

export default App
