import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface GalleryItem {
  id: number;
  title: string;
  description: string;
  history: string;
  culturalContext: string;
  imageUrl: string;
  category: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: 'Храм Василия Блаженного',
    description: 'Символ русской архитектуры с уникальными цветными куполами',
    history: 'Построен в 1555-1561 годах по приказу Ивана Грозного в честь взятия Казани. Архитекторы Барма и Постник создали уникальный ансамбль из девяти церквей на одном основании.',
    culturalContext: 'Храм стал визитной карточкой России и символом московского Кремля. Его архитектура не имеет аналогов в мировой практике, сочетая традиции русского деревянного зодчества с каменным строительством.',
    imageUrl: 'https://images.unsplash.com/photo-1513326738677-b964603b136d?w=800&q=80',
    category: 'Архитектура'
  },
  {
    id: 2,
    title: 'Матрёшка',
    description: 'Традиционная русская деревянная кукла с росписью',
    history: 'Первая матрёшка была создана в 1890 году в мастерской «Детское воспитание» Анатолием Мамонтовым. Прототипом послужила японская кукла Дарума.',
    culturalContext: 'Матрёшка стала символом России и русского народного творчества. Её образ воплощает идею материнства, плодородия и семейной преемственности поколений.',
    imageUrl: 'https://st.aestatic.net/items-img/R/N/5/F/S9d0d623e33ce4332846daea3c7a0acf1s.jpg_960x960.jpg',
    category: 'Народное творчество'
  },
  {
    id: 3,
    title: 'Русский балет',
    description: 'Мировое искусство классической хореографии',
    history: 'Русская балетная школа сформировалась в XVIII веке при императорском дворе. Расцвет пришёлся на XIX-XX века с появлением великих балетмейстеров Петипа, Фокина, Баланчина.',
    culturalContext: 'Русский балет оказал огромное влияние на мировую культуру. Дягилевские сезоны в Париже, творчество Павловой, Нижинского и других артистов определили развитие балета на столетие вперёд.',
    imageUrl: 'https://images.unsplash.com/photo-1508807526345-15e9b5f4eaff?w=800&q=80',
    category: 'Исполнительское искусство'
  },
  {
    id: 4,
    title: 'Самовар',
    description: 'Традиционное устройство для кипячения воды и символ русского чаепития',
    history: 'Первые самовары появились в России в XVIII веке. Центром самоварного производства стала Тула, где к XIX веку работало более 50 фабрик.',
    culturalContext: 'Самовар стал неотъемлемой частью русской культуры чаепития. Семейные чаепития у самовара символизировали уют, гостеприимство и семейные традиции русского дома.',
    imageUrl: 'https://minba.ru/userfiles/shop/large/1639_ugolnyy-samovar-shar-gla.jpg',
    category: 'Быт и традиции'
  },
  {
    id: 5,
    title: 'Кокошник',
    description: 'Традиционный русский женский головной убор',
    history: 'Кокошник известен с X-XI веков. Название происходит от древнерусского слова «кокош» — курица. Богато украшался жемчугом, золотым шитьём, драгоценными камнями.',
    culturalContext: 'Форма и украшения кокошника указывали на социальный статус, регион и семейное положение женщины. В XIX веке кокошник стал символом русского стиля в придворной моде.',
    imageUrl: 'https://cs5.livemaster.ru/storage/f4/19/eeec664b8ac33f030079c6281840--aksessuary-kokoshnik.jpg',
    category: 'Народный костюм'
  },
  {
    id: 6,
    title: 'Русская изба',
    description: 'Традиционное деревянное жилище',
    history: 'Изба — основной тип жилища на Руси с древнейших времён. Строилась из брёвен хвойных пород без гвоздей, с использованием техники рубки «в обло» или «в лапу».',
    culturalContext: 'Изба воплощала космогоническую модель мира. Каждый элемент имел символическое значение: красный угол — священное место, печь — сердце дома, порог — граница миров.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5b/%D0%9F%D0%B5%D1%80%D0%BC%D1%81%D0%BA%D0%B8%D0%B9_%D0%BA%D1%80%D0%B0%D0%B9_%D0%A5%D0%BE%D1%85%D0%BB%D0%BE%D0%B2%D0%BA%D0%B0_%D0%98%D0%B7%D0%B1%D0%B0_%D0%98%D0%B3%D0%BE%D1%88%D0%B5%D0%B2%D0%B0_01.jpg',
    category: 'Архитектура'
  },
  {
    id: 7,
    title: 'Гжель',
    description: 'Традиционная русская керамика с синей росписью',
    history: 'Промысел возник в Гжельском регионе в XIV веке. Классическая сине-белая роспись сформировалась в XIX веке и стала визитной карточкой русской керамики.',
    culturalContext: 'Гжельская роспись отражает красоту русской природы — морозные узоры, цветы, птицы. Техника подглазурной кобальтовой росписи требует высокого мастерства, так как цвет проявляется только после обжига.',
    imageUrl: 'https://ricynok.ru/foto/1475/podnos_gzhel_risunok_10.webp',
    category: 'Народное творчество'
  },
  {
    id: 8,
    title: 'Яйца Фаберже',
    description: 'Ювелирные шедевры русского императорского двора',
    history: 'С 1885 года Карл Фаберже создавал пасхальные яйца для императорской семьи. Всего было изготовлено 50 императорских яиц, каждое с уникальным «сюрпризом» внутри.',
    culturalContext: 'Яйца Фаберже стали символом роскоши и совершенства ювелирного искусства. Они сочетают русскую пасхальную традицию дарить крашеные яйца с европейским ювелирным мастерством.',
    imageUrl: 'https://basket-08.wbbasket.ru/vol1141/part114167/114167673/images/big/1.webp',
    category: 'Декоративно-прикладное искусство'
  }
];

export default function Index() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <header className="text-center mb-16 animate-fade-in">
          <div className="inline-block mb-4">
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mb-6"></div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-primary mb-4 font-cormorant">
            Галерея Русской Культуры
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Путешествие сквозь века художественного наследия России
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent mt-6 mx-auto"></div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {galleryItems.map((item, index) => (
            <Card
              key={item.id}
              className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 animate-scale-in border-2 hover:border-primary/50"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedItem(item)}
            >
              <div className="relative overflow-hidden bg-muted aspect-square">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute top-3 right-3 bg-secondary/90 backdrop-blur-sm text-accent-foreground px-3 py-1 rounded-full text-xs font-medium z-20">
                  {item.category}
                </div>
              </div>
              <CardContent className="p-5">
                <h3 className="text-xl font-semibold mb-2 text-primary font-cormorant group-hover:text-secondary transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {item.description}
                </p>
                <div className="mt-4 flex items-center text-primary text-sm font-medium group-hover:text-secondary transition-colors">
                  <span>Подробнее</span>
                  <Icon name="ChevronRight" size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedItem && (
            <>
              <DialogHeader>
                <div className="mb-4">
                  <span className="inline-block bg-secondary/20 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
                    {selectedItem.category}
                  </span>
                </div>
                <DialogTitle className="text-4xl font-cormorant text-primary mb-2">
                  {selectedItem.title}
                </DialogTitle>
                <DialogDescription className="text-lg text-foreground">
                  {selectedItem.description}
                </DialogDescription>
              </DialogHeader>
              
              <div className="mt-6 space-y-6">
                <div className="relative overflow-hidden rounded-lg aspect-video bg-muted">
                  <img
                    src={selectedItem.imageUrl}
                    alt={selectedItem.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-6">
                  <div className="border-l-4 border-primary pl-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name="Clock" size={20} className="text-primary" />
                      <h4 className="text-xl font-semibold font-cormorant text-primary">
                        Историческая справка
                      </h4>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedItem.history}
                    </p>
                  </div>

                  <div className="border-l-4 border-secondary pl-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name="BookOpen" size={20} className="text-secondary" />
                      <h4 className="text-xl font-semibold font-cormorant text-primary">
                        Культурный контекст
                      </h4>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedItem.culturalContext}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <footer className="mt-20 pb-8 text-center">
        <div className="w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-6"></div>
        <p className="text-muted-foreground text-sm">
          Галерея русской художественной культуры © 2024
        </p>
      </footer>
    </div>
  );
}