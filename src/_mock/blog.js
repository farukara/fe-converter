import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

const POST_TITLES = [
  'XML İşlemleri',
  /* 'Whiteboard Templates By Industry Leaders',
  'Tesla Cybertruck-inspired camper trailer for Tesla fans who can’t just wait for the truck!',
  'Designify Agency Landing Page Design',
  '✨What is Done is Done ✨',
  'Fresh Prince',
  'Six Socks Studio',
  'vincenzo de cotiis’ crossing over showcases a research on contamination',
  'Simple, Great Looking Animations in Your Project | Video Tutorial',
  '40 Free Serif Fonts for Digital Designers',
  'Examining the Evolution of the Typical Web Design Client',
  'Katie Griffin loves making that homey art',
  'The American Dream retold through mid-century railroad graphics',
  'Illustration System Design',
  'CarZio-Delivery Driver App SignIn/SignUp',
  'How to create a client-serverless Jamstack app using Netlify, Gatsby and Fauna',
  'Tylko Organise effortlessly -3D & Motion Design',
  'RAYO ?? A expanded visual arts festival identity',
  'Anthony Burrill and Wired mag’s Andrew Diprose discuss how they made January’s Change Everything cover',
  'Inside the Mind of Samuel Day',
  'Portfolio Review: Is This Portfolio Too Creative?',
  'Akkers van Margraten',
  'Gradient Ticket icon',
  'Here’s a Dyson motorcycle concept that doesn’t ‘suck’!',
  'How to Animate a SVG with border-image', */
];

const POST_CONTENTS = [
  `<h2>XML Bayiliği ve Dropshipping</h2>

Dropshipping stok olmaksızın satış yapmanızı sağlayan bir satış yöntemidir. Mantık ise sizlerin satmayı planladığınız ürünleri uygun pazardan alıp kâr sağlayarak satışını gerçekleştirmeniz üzerine kuruludur. Bu bağlamda ise XML Bayiliği hizmeti sunan firmalar işlerinizi oldukça kolaylaştırarak hem güvenli hem de sabır gerektirmeksizin gelir sağlamanızı sağlamaktadır.`,
];
const posts = [...Array(POST_TITLES.length)].map((_, index) => ({
  // id: faker.datatype.uuid(),
  id: `${index+1}`,
  cover: `/assets/images/covers/cover_${index + 1}.jpg`,
  title: POST_TITLES[index],
  content: POST_CONTENTS[index],
  createdAt: "2022-06-25",   
  view: faker.datatype.number(),
  comment: faker.datatype.number(),
  share: faker.datatype.number(),
  favorite: faker.datatype.number(),
  author: {
    name: "Aslı Demir",
    avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  },
}));

export default posts;
