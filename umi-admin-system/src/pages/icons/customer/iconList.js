const requireAll = requireContext => requireContext.keys().map(requireContext);
const svgs = require.context('./svg', false, /\.svg$/);
const iconList = requireAll(svgs);

export default iconList;
