import clsx from "clsx"
import { useState } from "react"
import { GitHub } from "react-feather"
import { AnimatePresence, motion } from "framer-motion"

function Footer({}) {
  const [showInfo, setShowInfo] = useState(false)
  return (
    <footer
      className={clsx(
        "flex items-center",
        "absolute bottom-3 right-3",
        "bg-gray-300/30 text-sm text-white",
        "backdrop-filter backdrop-blur",
        "p-2 rounded-lg",
        "dark:bg-gray-600/60"
      )}
      onMouseEnter={() => setShowInfo(true)}
      onMouseLeave={() => setShowInfo(false)}
    >
      <a
        href="https://github.com/Devon107/trelloboard"
        target="_blank"
        className="flex items-center"
      >
        <GitHub className="w-5 h-5" />
        <span className="ml-2 hidden">Github</span>
      </a>
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "auto" }}
            exit={{ width: 0 }}
            className="overflow-x-hidden"
          >
            <span className="mx-1">by</span>
            <a
              href="https://abinadihenriquez.netlify.app/"
              target="_blank"
              className="border-b border-green-400"
            >
              Aben
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  )
}

export default Footer