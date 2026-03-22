// "use client"

// import React, { useEffect, useState } from "react"
// import { motion } from "framer-motion"
// import { FaCode, FaTrophy, FaMedal, FaExternalLinkAlt } from "react-icons/fa"
// import { SiLeetcode, SiCodeforces, SiCodechef } from "react-icons/si"

// export default function CompetitiveProgramming() {

//   const [leetcodeSolved,setLeetcodeSolved] = useState<number | null>(null)
//   const [leetcodeRank,setLeetcodeRank] = useState<number | null>(null)

//   const [cfRating,setCfRating] = useState<number | null>(null)
//   const [cfRank,setCfRank] = useState<string | null>(null)
//   const [cfContests,setCfContests] = useState<number | null>(null)

//   const leetcodeUser = "Annuraag09"
//   const cfUser = "anuragyv"

//   useEffect(()=>{

//     // LEETCODE
//     fetch(`https://leetcode-api-faisalshohag.vercel.app/${leetcodeUser}`)
//     .then(res=>res.json())
//     .then(data=>{
//       setLeetcodeSolved(data.totalSolved)
//       setLeetcodeRank(data.ranking)
//     })

//     // CODEFORCES
//     fetch(`https://codeforces.com/api/user.info?handles=${cfUser}`)
//     .then(res=>res.json())
//     .then(data=>{
//       setCfRating(data.result[0].rating)
//       setCfRank(data.result[0].rank)
//     })

//     fetch(`https://codeforces.com/api/user.rating?handle=${cfUser}`)
//     .then(res=>res.json())
//     .then(data=>{
//       setCfContests(data.result.length)
//     })

//   },[])

//   return (

//     <section className="py-20">

//       <h2 className="text-3xl font-bold text-center mb-10">
//         Competitive Programming
//       </h2>

//       <div className="grid md:grid-cols-3 gap-6">

//         {/* LEETCODE */}

//         <motion.div className="bg-primary/10 border border-accent/20 rounded-xl p-6" whileHover={{y:-5}}>

//           <div className="flex items-center mb-4">

//             <SiLeetcode className="text-3xl mr-3 text-[#FFA116]" />

//             <h3 className="text-xl font-bold">LeetCode</h3>

//             <a
//             href="https://leetcode.com/u/Annuraag09/"
//             target="_blank"
//             className="ml-auto text-accent text-sm flex gap-1 items-center"
//             >
//             Profile <FaExternalLinkAlt size={12}/>
//             </a>

//           </div>

//           <div className="space-y-3">

//             <div className="flex items-center gap-2">
//               <FaCode/> Solved: {leetcodeSolved ?? "Loading"}
//             </div>

//             <div className="flex items-center gap-2">
//               <FaTrophy/> Global Rank: {leetcodeRank ?? "Loading"}
//             </div>

//           </div>

//         </motion.div>


//         {/* CODEFORCES */}

//         <motion.div className="bg-primary/10 border border-accent/20 rounded-xl p-6" whileHover={{y:-5}}>

//           <div className="flex items-center mb-4">

//             <SiCodeforces className="text-3xl mr-3 text-[#1F8ACB]" />

//             <h3 className="text-xl font-bold">Codeforces</h3>

//             <a
//             href="https://codeforces.com/profile/anuragyv"
//             target="_blank"
//             className="ml-auto text-accent text-sm flex gap-1 items-center"
//             >
//             Profile <FaExternalLinkAlt size={12}/>
//             </a>

//           </div>

//           <div className="space-y-3">

//             <div className="flex gap-2 items-center">
//               <FaTrophy/> Rating: {cfRating ?? "Loading"}
//             </div>

//             <div className="flex gap-2 items-center">
//               <FaMedal/> Rank: {cfRank ?? "Loading"}
//             </div>

//             <div className="flex gap-2 items-center">
//               <FaCode/> Contests: {cfContests ?? "Loading"}
//             </div>

//           </div>

//         </motion.div>


//         {/* CODECHEF */}

//         <motion.div className="bg-primary/10 border border-accent/20 rounded-xl p-6" whileHover={{y:-5}}>

//           <div className="flex items-center mb-4">

//             <SiCodechef className="text-3xl mr-3 text-[#5B4638]" />

//             <h3 className="text-xl font-bold">CodeChef</h3>

//             <a
//             href="https://www.codechef.com/users/annurag66"
//             target="_blank"
//             className="ml-auto text-accent text-sm flex gap-1 items-center"
//             >
//             Profile <FaExternalLinkAlt size={12}/>
//             </a>

//           </div>

//           <div className="space-y-3">

//             <div className="flex items-center gap-2">
//               <FaTrophy/> Rating: 1113
//             </div>

//             <div className="flex items-center gap-2">
//               ⭐ Stars: 2
//             </div>

//           </div>

//         </motion.div>

//       </div>

//     </section>

//   )

// }

"use client"

import React from "react"
import { motion } from "framer-motion"
import { FaCode, FaExternalLinkAlt } from "react-icons/fa"
import { SiLeetcode, SiCodeforces, SiCodechef } from "react-icons/si"

export default function CompetitiveProgramming() {

  return (

    <section className="py-20">

      <h2 className="text-3xl font-bold text-center mb-10">
        Competitive Programming
      </h2>

      <div className="grid md:grid-cols-3 gap-6">

        {/* LEETCODE */}
        <motion.div 
          className="bg-primary/10 border border-accent/20 rounded-xl p-6" 
          whileHover={{ y: -5 }}
        >
          <div className="flex items-center mb-4">
            <SiLeetcode className="text-3xl mr-3 text-[#FFA116]" />
            <h3 className="text-xl font-bold">LeetCode</h3>

            <a
              href="https://leetcode.com/u/Annuraag0/"
              target="_blank"
              className="ml-auto text-accent text-sm flex gap-1 items-center"
            >
              Profile <FaExternalLinkAlt size={12}/>
            </a>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <FaCode/> 400+ Problems Solved
            </div>
          </div>
        </motion.div>


        {/* CODEFORCES */}
        <motion.div 
          className="bg-primary/10 border border-accent/20 rounded-xl p-6" 
          whileHover={{ y: -5 }}
        >
          <div className="flex items-center mb-4">
            <SiCodeforces className="text-3xl mr-3 text-[#1F8ACB]" />
            <h3 className="text-xl font-bold">Codeforces</h3>

            <a
              href="https://codeforces.com/profile/anuragy55"
              target="_blank"
              className="ml-auto text-accent text-sm flex gap-1 items-center"
            >
              Profile <FaExternalLinkAlt size={12}/>
            </a>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <FaCode/> 100+ Problems Solved
            </div>
          </div>
        </motion.div>


        {/* CODECHEF */}
        <motion.div 
          className="bg-primary/10 border border-accent/20 rounded-xl p-6" 
          whileHover={{ y: -5 }}
        >
          <div className="flex items-center mb-4">
            <SiCodechef className="text-3xl mr-3 text-[#5B4638]" />
            <h3 className="text-xl font-bold">CodeChef</h3>

            <a
              href="https://www.codechef.com/users/annurag"
              target="_blank"
              className="ml-auto text-accent text-sm flex gap-1 items-center"
            >
              Profile <FaExternalLinkAlt size={12}/>
            </a>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <FaCode/> 100+ Problems Solved
            </div>
          </div>
        </motion.div>

      </div>

    </section>
  )
}