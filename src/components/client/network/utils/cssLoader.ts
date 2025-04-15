
export const forceCssReload = () => {
  // Force reload network.css with a timestamp to avoid cache
  const timestamp = new Date().getTime();
  const linkId = 'network-css-dynamic';
  
  // Remove the previous link if it exists
  const existingLink = document.getElementById(linkId);
  if (existingLink) {
    existingLink.remove();
  }
  
  // Create a new link with timestamp
  const link = document.createElement('link');
  link.id = linkId;
  link.rel = 'stylesheet';
  link.href = `/src/styles/network.css?v=${timestamp}`;
  document.head.appendChild(link);
  
  console.log(`Forçando recarga de CSS com timestamp: ${timestamp}`);
  
  return () => {
    if (link && link.parentNode) {
      link.parentNode.removeChild(link);
    }
  };
};
