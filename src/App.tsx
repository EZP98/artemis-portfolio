import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion'

// Floating images for hero section
const heroImages = [
  { id: 1, x: 80, y: 120, w: 180, h: 220, rotate: -8, image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=400' },
  { id: 2, x: 280, y: 80, w: 160, h: 200, rotate: 5, image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400' },
  { id: 3, x: 900, y: 100, w: 200, h: 240, rotate: 8, image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400' },
  { id: 4, x: 1100, y: 140, w: 170, h: 210, rotate: -6, image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400' },
]

// Gallery images for sneak peak section
const galleryImages = [
  'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600',
  'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600',
  'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600',
  'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600',
  'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600',
]

// Works/Projects
const projects = [
  {
    id: 1,
    title: 'FinFlow',
    category: 'Finance App',
    description: 'A comprehensive finance management platform for modern users.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600',
  },
  {
    id: 2,
    title: 'LaunchPad',
    category: 'Startup Platform',
    description: 'Helping startups launch and scale their products effectively.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600',
  },
  {
    id: 3,
    title: 'HealthSync',
    category: 'Health Tech',
    description: 'Connecting patients with healthcare providers seamlessly.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600',
  },
  {
    id: 4,
    title: 'TalentBridge',
    category: 'HR Platform',
    description: 'Bridging the gap between talent and opportunity.',
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600',
  },
]

// Skills/Abilities
const skills = [
  { name: 'UI Design', rotate: -5 },
  { name: 'UX Research', rotate: 3 },
  { name: 'Prototyping', rotate: -3 },
  { name: 'Design Systems', rotate: 6 },
  { name: 'Figma', rotate: -4 },
  { name: 'Framer', rotate: 2 },
  { name: 'Motion Design', rotate: -6 },
  { name: 'User Testing', rotate: 4 },
  { name: 'Wireframing', rotate: -2 },
  { name: 'Visual Design', rotate: 5 },
]

// Draggable Hero Image
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
      whileDrag={{ cursor: 'grabbing', scale: 1.05, boxShadow: '0 25px 50px -12px rgba(0, 22, 102, 0.25)' }}
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: item.id * 0.1 }}
      className="select-none rounded-2xl overflow-hidden shadow-xl"
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

// Arc Text Component
function ArcText({ text }: { text: string }) {
  return (
    <div className="relative w-64 h-64">
      <svg viewBox="0 0 256 256" className="w-full h-full">
        <defs>
          <path
            id="textCircle"
            d="M 128,128 m -100,0 a 100,100 0 1,1 200,0 a 100,100 0 1,1 -200,0"
          />
        </defs>
        <text className="fill-[#001666] text-[14px] font-medium tracking-[0.3em]">
          <textPath href="#textCircle" startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        <div className="w-16 h-16 rounded-full bg-[#FF5900] flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </motion.div>
    </div>
  )
}

// Hero Section
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-8 py-20">
      {/* Floating Images */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="relative w-full h-full pointer-events-auto">
          {heroImages.map((item) => (
            <DraggableImage key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* Center Content */}
      <div className="relative z-20 text-center max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-sm font-medium tracking-widest text-[#001666]/60 mb-4"
        >
          HELLO, I'M ARTEMIS
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-6xl md:text-8xl font-black leading-none tracking-tight text-[#001666] mb-6"
        >
          Product &<br />Visual Designer
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-2xl md:text-3xl font-medium text-[#001666]/80 mb-8"
        >
          startups can count on!
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#FF5900] text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow"
        >
          Get Started
        </motion.button>
      </div>

      {/* Arc Text - Bottom Right */}
      <motion.div
        initial={{ opacity: 0, rotate: -20 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute bottom-20 right-20 hidden lg:block"
      >
        <ArcText text="THIS IS ARTEMIS • THIS IS ARTEMIS • " />
      </motion.div>
    </section>
  )
}

// Sneak Peak Section - Horizontal Scroll Gallery
function SneakPeakSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-30%'])

  return (
    <section ref={containerRef} className="py-20 overflow-hidden">
      <div className="px-8 mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl font-black text-[#001666] mb-4"
        >
          Sneak Peak
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl text-[#001666]/60"
        >
          A glimpse into my creative world
        </motion.p>
      </div>

      <motion.div style={{ x }} className="flex gap-6 pl-8">
        {galleryImages.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, rotate: index % 2 === 0 ? 2 : -2 }}
            className="flex-shrink-0 w-80 h-96 rounded-2xl overflow-hidden shadow-lg"
          >
            <img
              src={image}
              alt={`Gallery ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

// Works Section
function WorksSection() {
  return (
    <section className="py-20 px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl font-black text-[#001666] mb-4"
        >
          Selected Works
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl text-[#001666]/60 mb-16"
        >
          Projects that made an impact
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl mb-4">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-72 object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                />
                <div className="absolute inset-0 bg-[#001666]/0 group-hover:bg-[#001666]/20 transition-colors duration-300" />
              </div>
              <span className="text-sm font-medium tracking-wider text-[#FF5900]">
                {project.category}
              </span>
              <h3 className="text-2xl font-bold text-[#001666] mt-1 mb-2">
                {project.title}
              </h3>
              <p className="text-[#001666]/60">
                {project.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Ability Section
function AbilitySection() {
  return (
    <section className="py-20 px-8 bg-[#001666]">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl font-black text-white mb-4"
        >
          My Abilities
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl text-white/60 mb-16"
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
    <section className="py-32 px-8">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-black text-[#001666] mb-6"
        >
          Let's Work<br />Together
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl text-[#001666]/60 mb-12"
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
          className="inline-block bg-[#FF5900] text-white px-10 py-5 rounded-full font-semibold text-xl shadow-lg hover:shadow-xl transition-shadow"
        >
          Get in Touch
        </motion.a>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  return (
    <footer className="py-8 px-8 border-t border-[#001666]/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-[#001666]/50">
          © 2025 Artemis. All rights reserved.
        </p>
        <div className="flex gap-6">
          {['Twitter', 'LinkedIn', 'Dribbble', 'Behance'].map((social) => (
            <a
              key={social}
              href="#"
              className="text-sm text-[#001666]/50 hover:text-[#001666] transition-colors"
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
    <div className="min-h-screen bg-[#EBE9E4]">
      <HeroSection />
      <SneakPeakSection />
      <WorksSection />
      <AbilitySection />
      <ContactSection />
      <Footer />
    </div>
  )
}

export default App
