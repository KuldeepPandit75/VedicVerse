import { motion } from "framer-motion";

const treeData = {
  name: "Vedas",
  children: [
    {
      name: "Rigveda",
      children: [{ name: "Samhitas" }, { name: "Vedic Sacrifices" }],
    },
    {
      name: "Yajurveda",
      children: [{ name: "Child 2.1" }, { name: "Child 2.2" }],
    },
    {
      name: "Samaveda",
      children: [{ name: "Child 2.1" }, { name: "Child 2.2" }],
    },
    {
      name: "Atharvaveda",
      children: [{ name: "Child 2.1" }, { name: "Child 2.2" }],
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
      {level > 0 && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "24px" }}
          transition={{ duration: 0.8, delay: level * 0.8 }}
          className="absolute top-[-24px] left-1/2 w-0.5 bg-gray-500"
        ></motion.div>
      )}
      <div className="text-[#4d2305] border-2 border-[#d4af37] rounded-full bg-[#bf842c] px-4 py-2 shadow-md relative">
        {node.name}
      </div>
      {node.children && (
        <div className="flex gap-6 mt-4 relative">
          {node.children.map((child, index) => (
            <div key={index} className="relative flex flex-col items-center">
              {/* Vertical line from parent to child */}
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "24px" }}
                transition={{ duration: 0.8, delay: (level + 1) * 0.8 }}
                className="absolute top-[-24px] left-1/2 w-0.5 bg-[#d4af37]"
              ></motion.div>
              {/* Horizontal connecting lines */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "24px" }}
                transition={{ duration: 0.5, delay: (level + 1) * 0.8 }}
                className={`absolute top-[-24px] ${
                  index === 0 ? "right-0" : "left-0"
                } h-0.5 bg-[#d4af37]`}
              ></motion.div>
              <TreeNode node={child} level={level + 1} />
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

const AnimatedTree = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Vedic Tree</h1>
      <TreeNode node={treeData} />
    </div>
  );
};

export default AnimatedTree;
