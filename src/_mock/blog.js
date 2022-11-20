import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

const AUTHORS = [
  "Aslı Demir",
  "Murat Hızlı"
]
const POST_TITLES = [
  'XML İşlemleri',
  'XML Dönüştürme Hizmetleri',
];

const POST_CONTENTS = [
  `<h2>XML Bayiliği ve Dropshipping</h2>

  Dropshipping stok olmaksızın satış yapmanızı sağlayan bir satış yöntemidir. Mantık ise sizlerin satmayı planladığınız ürünleri uygun pazardan alıp kâr sağlayarak satışını gerçekleştirmeniz üzerine kuruludur. Bu bağlamda ise XML Bayiliği hizmeti sunan firmalar işlerinizi oldukça kolaylaştırarak hem güvenli hem de sabır gerektirmeksizin gelir sağlamanızı sağlamaktadır.`,
  //----
  `
<p>Elinizdeki XML formatındaki ürün bilgilerini kendi e-ticaret sitenize yüklemede problem mi yaşıyorsunuz? XML e-faturanızı sitenizde veya masa üstü programınızda görmek mi istiyorsunuz? Satın aldığınız XML dosyası entegrasyon programınızla uyumsuz mu? </p>

<p>XML ürünlerinizi yüklediniz ama stok ve fiyat güncellemesi yapamıyor musunuz? Elle manuel güncelleme yerine otomatik gün içinde stok ve fiyat bilgisini XML den çekip yükleyecek bir sisteme mi ihtiyacınız var?</p>

<p>Çözüm için doğru yerdesiniz. XML dönüştürme hizmetlerimizden size özel hazırlanacak çözümlerle faydalanabilirsiniz.</p>
  `,
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
    name: AUTHORS[index],
    avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  },
}));

export default posts;
