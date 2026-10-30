export const CATEGORIES = [
  { name: 'Technology', label: 'Technology', color: '#2F5BEA', tint: '#E3EAFD', onColor: '#FFFFFF', blurb: 'Web, data and cloud skills' },
  { name: 'Design', label: 'Design', color: '#E4447B', tint: '#FCE4EC', onColor: '#FFFFFF', blurb: 'Interfaces, brands and prototypes' },
  { name: 'Business', label: 'Business', color: '#F0A030', tint: '#FDF0DA', onColor: '#101B33', blurb: 'Marketing, product and finance' },
  { name: 'Career', label: 'Career Development', color: '#0F9D86', tint: '#DAF2EE', onColor: '#FFFFFF', blurb: 'Interviews, writing and communication' },
];

export const LEVELS = ['Beginner', 'Intermediate', 'Advanced'];

export const categoryOf = (name) => CATEGORIES.find((c) => c.name === name) || CATEGORIES[0];
export const formatPrice = (n) => '₹' + Number(n).toLocaleString('en-IN');
