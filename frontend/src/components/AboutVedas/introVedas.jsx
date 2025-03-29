import { motion } from "framer-motion";

const treeData = {
  name: "Vedas",
  children: [
    {
      name: "Rigveda",
      // children: [{ name: "Samhitas" }, { name: "Vedic Sacrifices" }],
    },
    {
      name: "Yajurveda",
      // children: [{ name: "Child 2.1" }, { name: "Child 2.2" }],
    },
    {
      name: "Samaveda",
      // children: [{ name: "Child 2.1" }, { name: "Child 2.2" }],
    },
    {
      name: "Atharvaveda",
      // children: [{ name: "Child 2.1" }, { name: "Child 2.2" }],
    },
  ],
};

const TreeNode = ({ node, level = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: level * 0.8, duration: 0.8 }}
      className="flex flex-col items-center relative mt-6"
    >
      {/* Vertical line connecting parent to children */}
      {/* {level > 0 && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "100px" }}
          transition={{ duration: 0.8, delay: level * 0.8 }}
          className="absolute top-[-24px] left-1/2 w-0.5 bg-gray-500"
        ></motion.div>
      )} */}
      <div className="text-[#4d2305] text-xl border-2 border-[#d4af37] rounded-full bg-[#bf842c] px-8 py-4 shadow-md relative">
        {node.name}
      </div>
      {node.children && (
        <div className="flex gap-36 mt-4 relative">
          {node.children.map((child, index) => (
            <div key={index} className="relative flex flex-col items-center">
              {/* Vertical line from parent to child */}
              <motion.div
                initial={{ height: -2 }}
                animate={{ height: "90px" }}
                transition={{ duration: 0.8, delay: (level + 1) * 0.8 }}
                className="absolute top-[-55px] left-1/2 w-0.5 bg-[#0c0a05]"
              ></motion.div>
              {/* Horizontal connecting lines */}

              <TreeNode node={child} level={level + 1} />
            </div>
          ))}
        </div>
      )}
      <motion.div
        style={{
          width: "100%",
          height: "3px", // Line thickness
          backgroundColor: "black", // Line color
          position: "absolute", // Use absolute positioning to control its vertical position
          top: "30px", // Move the line 20px from the top (you can adjust this value)
          left: "50%",
          transform: "translateX(-50%)", // Center the line horizontally
          zIndex: -1,
        }}
        initial={{ width: 0 }} // Start with width of 0 (line in the center)
        animate={{ width: "90%" }} // Animate the width to 90%
        transition={{ duration: 2 }} // Duration of the animation (2 seconds)
      />
    </motion.div>
  );
};

const AnimatedTree = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      {/* <h1 className="text-2xl font-bold mb-4">Vedic Tree</h1> */}
      <TreeNode node={treeData} />
    </div>
  );
};

export default AnimatedTree;
