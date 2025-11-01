
"use client";

import { useEffect, useState } from "react";
import { collection, doc, writeBatch } from "firebase/firestore";
import { useFirestore } from "@/firebase";
import { Button } from "@/components/ui/button";

// This is the raw data from the original JSON file.
// We are embedding it here for this one-time seeding process.
const placeholderImagesData = {
  placeholderImages: [
    {
      id: "hero-main",
      altText: "A dramatic, colorful sunset over the Zimbabwean landscape.",
      imageUrl: "https://images.unsplash.com/photo-1544198422-33759a229352?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      imageHint: "dramatic sunset",
    },
    {
      id: "hero-timeline",
      altText: "An old, weathered book open to a page with handwritten notes.",
      imageUrl: "https://images.unsplash.com/photo-1472173148041-00294f0814a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxoaXN0b3J5JTIwYm9va3xlbnwwfHx8fDE3NjE5OTE1NDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      imageHint: "history book",
    },
    {
      id: "hero-achievements",
      altText: "A newly constructed highway interchange in Harare, an example of modern infrastructure.",
      imageUrl: "https://prod.cdn-medias.theafricareport.com/cdn-cgi/image/q=auto,f=auto,metadata=none,width=760,fit=cover/https://prod.cdn-medias.theafricareport.com/medias/2025/06/26/trabablas-e1750949880325.jpeg",
      imageHint: "modern infrastructure",
    },
    {
      id: "hero-history",
      altText: "A vintage black and white photograph of a political gathering.",
      imageUrl: "https://images.unsplash.com/photo-1576858688752-d7d4dbd6686a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxoaXN0b3JpY2FsJTIwcGhvdG98ZW58MHx8fHwxNzYxOTkxNTQ5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      imageHint: "historical photo",
    },
    {
      id: "hero-gallery",
      altText: "A collection of framed photos on a wall.",
      imageUrl: "https://images.unsplash.com/photo-1614447412838-3f4ebd5c2dc0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxwaG90byUyMGdhbGxlcnl8ZW58MHx8fHwxNzYxODg5NzAyfDA&ixlib=rb-4.1.0&q=80&w=1080",
      imageHint: "photo gallery",
    },
    {
      id: "timeline-birth",
      altText: "Emmerson Mnangagwa's official portrait.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/31/Emmerson_Mnangagwa_Official_Portrait.jpg",
      imageHint: "official portrait",
    },
    {
      id: "timeline-activism",
      altText: "A depiction of guerrilla fighters during the liberation struggle.",
      imageUrl: "https://www.colonialrelic.com/ww/wp-content/uploads/2012/12/herber_chitepo-249x300.png",
      imageHint: "liberation war",
    },
    {
      id: "timeline-rise",
      altText: "Robert Mugabe with other ZANU leaders, representing the party's hierarchy.",
      imageUrl: "https://pbs.twimg.com/media/EhOElfuWAAA6HVw.png",
      imageHint: "historical leaders",
    },
    {
      id: "timeline-government",
      altText: "The Parliament of Zimbabwe building in Harare.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Zanu_PF_Building.jpg",
      imageHint: "parliament building",
    },
    {
      id: "timeline-vp",
      altText: "Official portrait of Emmerson Mnangagwa as Vice President.",
      imageUrl: "https://www.zbcnews.co.zw/wp-content/uploads/2024/09/IMG-20240901-WA0147.jpg",
      imageHint: "official portrait",
    },
    {
      id: "timeline-inauguration",
      altText: "Emmerson Mnangagwa taking the oath of office in 2017.",
      imageUrl: "https://www.aljazeera.com/wp-content/uploads/2023/08/33TT9AZ-highres-1-1693132132.jpg?quality=80&resize=770%2C513",
      imageHint: "presidential inauguration",
    },
    {
      id: "timeline-election1",
      altText: "President Mnangagwa at a campaign rally in 2018.",
      imageUrl: "https://i.guim.co.uk/img/media/e26806b2636b65948c3a0133dde1a9262f98c1f4/0_200_6000_3600/master/6000.jpg?crop=none&dpr=1&s=none&width=465",
      imageHint: "campaign rally",
    },
    {
      id: "timeline-election2",
      altText: "President Mnangagwa after being re-elected in 2023.",
      imageUrl: "https://media.cnn.com/api/v1/images/stellar/prod/171124104634-09-emmerson-mnangagwa-1124.jpg?q=w_3000%2Ch_1902%2Cx_0%2Cy_0%2Cc_fill",
      imageHint: "official speech",
    },
    {
      id: "history-origins-1",
      altText: "A graphic showing the split of ZAPU and the formation of ZANU.",
      imageUrl: "https://www.tandfonline.com/cms/asset/775c8bd9-2a79-42aa-a41a-f2db27fe7d2c/cjss_a_1281040_f0001_oc.gif",
      imageHint: "historical chart",
    },
    {
      id: "history-origins-2",
      altText: "ZANU PF Founders",
      imageUrl: "https://www.heraldonline.co.zw/wp-content/uploads/2025/07/e5y5ye5y.jpg",
      imageHint: "historical leaders",
    },
    {
      id: "history-origins-3",
      altText: "A portrait of Ndabaningi Sithole.",
      imageUrl: "https://www.english.ox.ac.uk/sites/default/files/english/images/media/ndabaningi_sithole_portrait.jpg",
      imageHint: "portrait leader",
    },
    {
      id: "history-origins-4",
      altText: "A cropped portrait of Ndabaningi Sithole.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/66/Ndabaningi_Sithole_%28cropped%29.jpg",
      imageHint: "portrait leader",
    },
    {
      id: "history-origins-5",
      altText: "A portrait of Herbert Chitepo.",
      imageUrl: "https://www.colonialrelic.com/ww/wp-content/uploads/2012/12/herber_chitepo-249x300.png",
      imageHint: "portrait lawyer",
    },
    {
      id: "history-origins-6",
      altText: "A portrait of Herbert Chitepo.",
      imageUrl: "https://static.wixstatic.com/media/8625ec_c23694c1aeb54a8e85797c3ec60cbe8a~mv2.jpg/v1/fill/w_734%2Ch_1000%2Cal_c%2Cq_85%2Cusm_0.66_1.00_0.01/8625ec_c23694c1aeb54a8e85797c3ec60cbe8a~mv2.jpg",
      imageHint: "portrait lawyer",
},
    {
      id: "key-figure-mugabe",
      altText: "Robert Mugabe and Joshua Nkomo, two key figures in Zimbabwe's liberation.",
      imageUrl: "https://www.victoriafalls-guide.net/images/nkomo-and-mugabe.jpg",
      imageHint: "historical leaders",
    },
    {
      id: "key-figure-mugabe-2",
      altText: "A portrait of Robert Mugabe.",
      imageUrl: "https://images.ft.com/v3/image/raw/http%3A%2F%2Fcom.ft.imagepublish.upp-prod-eu.s3.amazonaws.com%2Fbe0fed5a-d2e5-11e9-8d46-8def889b4137?dpr=1&fit=scale-down&quality=highest&source=next-article&width=700",
      imageHint: "portrait leader",
},
    {
      id: "key-figure-nkomo",
      altText: "A portrait of Joshua Nkomo, leader of ZAPU.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/01/Joshua_Nkomo_%281978%29.jpg",
      imageHint: "portrait leader",
    },
    {
      id: "key-figure-nkomo-2",
      altText: "A portrait of Joshua Nkomo.",
      imageUrl: "https://cdn.britannica.com/06/61906-004-F6156AEA/Joshua-Nkomo-1979.jpg",
      imageHint: "portrait leader",
},
    {
      id: "key-figure-chitepo",
      altText: "A portrait of Herbert Chitepo, the first black barrister in Rhodesia.",
      imageUrl: "https://www.dandaro.online/wp-content/uploads/2025/06/herbert-chitepo.jpg",
      imageHint: "portrait lawyer",
    },
    {
      id: "key-figure-chitepo-2",
      altText: "A portrait of Herbert Chitepo.",
      imageUrl: "https://www.pindula.co.zw/images/d/d9/Herbert_chitepo.png",
      imageHint: "portrait lawyer",
},
    {
      id: "milestone-struggle",
      altText: "ZANLA combatants during the liberation struggle.",
      imageUrl: "https://www.zimbabwesituation.com/wp-content/uploads/2017/11/21zimbabwe-personal1-superJumbo.jpg",
      imageHint: "liberation fighters",
    },
    {
      id: "milestone-independence",
      altText: "Celebrations on Zimbabwe's Independence Day in 1980.",
      imageUrl: "https://www.victoriafalls-guide.net/image-files/zimbabwe-independence-day.jpg",
      imageHint: "independence celebration",
    },
    {
      id: "milestone-unity",
      altText: "Robert Mugabe and Joshua Nkomo signing the Unity Accord in 1987.",
      imageUrl: "https://cite.org.zw/wp-content/uploads/2024/12/Mugabe-NKOMO.jpg",
      imageHint: "political agreement",
    },
    {
      id: "milestone-unity-2",
      altText: "Robert Mugabe and Joshua Nkomo after signing the Unity Accord in 1987.",
      imageUrl: "https://s3-eu-west-2.amazonaws.com/newzimlive/wp-content/uploads/2019/12/21204045/Joshua-Nkomo-Mugabe.jpg",
      imageHint: "political agreement",
    },
    {
      id: "milestone-land-reform",
      altText: "A farmer on a redistributed farm in Zimbabwe.",
      imageUrl: "https://www.zimbabwesituation.com/wp-content/uploads/2019/12/Zimbabwe-Farm-Invasions.jpeg",
      imageHint: "farming land",
    },
    {
      id: "milestone-land-reform-2",
      altText: "A book cover about land reform in Zimbabwe.",
      imageUrl: "https://images.routledge.com/common/jackets/crclarge/978131587/9781315873275.jpg",
      imageHint: "book cover",
    },
    {
      id: "milestone-new-dispensation",
      altText: "Emmerson Mnangagwa being sworn in as President in 2017.",
      imageUrl: "https://www.aljazeera.com/wp-content/uploads/2023/08/33TT9AZ-highres-1-1693132132.jpg?quality=80&resize=770%2C513",
      imageHint: "presidential inauguration",
    },
    {
      id: "ideology-structure",
      altText: "The ZANU-PF headquarters building in Harare.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Zanu_PF_Building.jpg",
      imageHint: "political building",
    },
    {
      id: "ideology-structure-2",
      altText: "A ZANU-PF rally.",
      imageUrl: "https://news.pindula.co.zw/wp-content/uploads/2017/11/zanu-pf-building-hq.jpg",
      imageHint: "political rally",
    },
    {
      id: "ideology-structure-3",
      altText: "The ZANU-PF Politburo.",
      imageUrl: "https://www.zimeye.net/wp-content/uploads/2025/08/Politburo-1024x683.jpeg",
      imageHint: "political meeting",
    },
    {
      id: "ideology-structure-4",
      altText: "The ZANU-PF Central Committee.",
      imageUrl: "https://static.africa-press.net/zimbabwe/sites/14/2022/10/postQueueImg_5-635a8d0de95b2.jpg",
      imageHint: "political meeting",
    },
    {
      id: "ideology-structure-5",
      altText: "The ZANU-PF Women's League.",
      imageUrl: "https://www.zbcnews.co.zw/wp-content/uploads/2025/09/WhatsApp-Image-2025-09-30-at-6.05.12-PM.jpeg",
      imageHint: "political group",
    },
    {
      id: "ideology-structure-6",
      altText: "The ZANU-PF Youth League.",
      imageUrl: "https://masvingomirror.com/wp-content/uploads/2022/06/Womens-League1.webp",
      imageHint: "political group",
    },
    {
      id: "challenges-turning-points",
      altText: "A crowd of opposition supporters at a rally.",
      imageUrl: "https://gdb.voanews.com/c4310000-0aff-0242-6a66-08d9f4a8c462_w1080_h608.jpeg",
      imageHint: "political rally",
    },
    {
      "id": "gallery-speech-1",
      "altText": "President giving a speech at a podium.",
      "imageUrl": "https://pbs.twimg.com/media/G4mXWAJWEAAQweL.jpg",
      "imageHint": "president speech"
    },
    {
      "id": "gallery-speech-2",
      "altText": "President giving a speech from a podium.",
      "imageUrl": "https://pbs.twimg.com/media/G4mXuxPWwAAEwLo.jpg",
      "imageHint": "president speech"
    },
    {
      "id": "gallery-speech-3",
      "altText": "President giving a speech at an event.",
      "imageUrl": "https://pbs.twimg.com/media/G4VF4tVXwAA6HzF.jpg",
      "imageHint": "president speech"
    },
    {
      "id": "gallery-speech-4",
      "altText": "President speaking at a conference.",
      "imageUrl": "https://cdn1.img.sputniknews.africa/img/07e7/0c/16/1064254633_0%3A160%3A3072%3A1888_1920x0_80_0_0_c2a3fb3e127df2ee63a8b67d37fc37d3.jpg",
      "imageHint": "president speech"
    },
    {
      "id": "gallery-speech-5",
      "altText": "President giving a speech outdoors.",
      "imageUrl": "https://pbs.twimg.com/media/Gs0XGnqbkAAHvkb.jpg",
      "imageHint": "president speech"
    },
    {
      "id": "gallery-speech-6",
      "altText": "President at a podium during a formal event.",
      "imageUrl": "https://pbs.twimg.com/media/G3jPbwdWIAAJ9jU.jpg",
      "imageHint": "president speech"
    },
    {
      "id": "gallery-investors-1",
      "altText": "President in a meeting with international investors.",
      "imageUrl": "https://omo-oss-image.thefastimg.com/portal-saas/new2023092715304672266/cms/image/2e14302a-2ece-4079-b791-502e1cef6fd6.png",
      "imageHint": "business meeting"
    },
    {
      "id": "gallery-investors-2",
      "altText": "President Mnangagwa meeting with investors.",
      "imageUrl": "https://s3-eu-west-2.amazonaws.com/newzimlive/wp-content/uploads/2020/05/20200801/Mnangagwa-1.jpg",
      "imageHint": "business meeting"
    },
    {
      "id": "gallery-investors-3",
      "altText": "President at a business forum.",
      "imageUrl": "https://hurumende.com/wp-content/uploads/2025/10/3-1000x600.png",
      "imageHint": "business forum"
    },
    {
      "id": "gallery-investors-4",
      "altText": "President Mnangagwa in a discussion with investors.",
      "imageUrl": "https://www.heraldonline.co.zw/wp-content/uploads/site//2/Mnangagwa2.jpg",
      "imageHint": "business discussion"
    },
    {
      "id": "gallery-investors-5",
      "altText": "President giving a State of the Nation Address.",
      "imageUrl": "https://s3-eu-west-2.amazonaws.com/newzimlive/wp-content/uploads/2025/10/28164746/Mnangagwa-SONA.jpg",
      "imageHint": "official address"
    },
    {
      "id": "gallery-investors-6",
      "altText": "President Mnangagwa and his son in China.",
      "imageUrl": "https://nehandaradio.com/wp-content/uploads/2024/09/Mnangagwa-and-son-in-China.jpeg",
      "imageHint": "international relations"
    },
    {
      "id": "gallery-infra-1",
      "altText": "President launching a road construction project.",
      "imageUrl": "https://southernafricantimes.com/wp-content/uploads/2025/05/IMG_6859.jpeg",
      "imageHint": "road construction"
    },
    {
      "id": "gallery-infra-2",
      "altText": "The commissioning of the Trabablas Interchange.",
      "imageUrl": "https://zimbabweanpatriot.co.zw/wp-content/uploads/2025/05/Trabablas-Interchange-commissioning-780x470.jpg",
      "imageHint": "infrastructure project"
    },
    {
      "id": "gallery-infra-3",
      "altText": "President at an infrastructure project launch.",
      "imageUrl": "https://www.zbcnews.co.zw/wp-content/uploads/2024/12/IMG-20241212-WA0086.jpg",
      "imageHint": "infrastructure launch"
    },
    {
      "id": "gallery-infra-4",
      "altText": "President inspecting new infrastructure.",
      "imageUrl": "https://www.zbcnews.co.zw/wp-content/uploads/2024/08/WhatsApp-Image-2024-08-09-at-12.39.50.jpeg",
      "imageHint": "infrastructure inspection"
    },
    {
      "id": "gallery-infra-5",
      "altText": "President at the site of a new interchange.",
      "imageUrl": "https://www.zimeye.net/wp-content/uploads/2025/05/IMG_1958-739x1024.jpeg",
      "imageHint": "interchange construction"
    },
    {
      "id": "gallery-infra-6",
      "altText": "The Trabablas Interchange.",
      "imageUrl": "https://newziana.co.zw/wp-content/uploads/2025/05/Trabablas-Interchange-696x691.webp",
      "imageHint": "modern interchange"
    },
    {
      "id": "gallery-rally-1",
      "altText": "A large crowd at a ZANU-PF rally.",
      "imageUrl": "https://ipi.media/wp-content/uploads/2023/08/Zimbabwe-ZANU-PF-rally.jpg",
      "imageHint": "political rally"
    },
    {
      "id": "gallery-rally-2",
      "altText": "ZANU-PF supporters at a rally.",
      "imageUrl": "https://gdb.voanews.com/c4310000-0aff-0242-6a66-08d9f4a8c462_w1080_h608.jpeg",
      "imageHint": "political rally"
    },
    {
      "id": "gallery-rally-3",
      "altText": "A sea of supporters at a ZANU-PF event.",
      "imageUrl": "https://www.boell.de/sites/default/files/styles/var_desktop/public/uploads/2018/07/rts1vpm8.jpg.jpg?itok=jmopDs1X",
      "imageHint": "political rally"
    },
    {
      "id": "gallery-rally-4",
      "altText": "A ZANU-PF rally in progress.",
      "imageUrl": "https://zanupf.org.zw/storage/posts/876.jpeg",
      "imageHint": "political rally"
    },
    {
      "id": "gallery-rally-5",
      "altText": "A large gathering for a ZANU-PF rally.",
      "imageUrl": "https://www.aljazeera.com/wp-content/uploads/2018/07/93a6276058da480d94d76e629bcfde62_18.jpeg?resize=1200%2C675",
      "imageHint": "political rally"
    },
    {
      "id": "gallery-rally-6",
      "altText": "Supporters at a ZANU-PF rally.",
      "imageUrl": "https://www.aljazeera.com/wp-content/uploads/2019/10/7bc99a2af3b047c6a3224da9de1c8926_18.jpeg?quality=80&resize=770%2C513",
      "imageHint": "political rally"
    },
    {
      "id": "gallery-health-1",
      "altText": "President visiting a hospital.",
      "imageUrl": "https://s3-eu-west-2.amazonaws.com/newzimlive/wp-content/uploads/2025/06/17060121/ed-hospital-scaled.jpeg",
      "imageHint": "hospital visit"
    },
    {
      "id": "gallery-health-2",
      "altText": "President at the Parirenyatwa Hospital.",
      "imageUrl": "https://www.heraldonline.co.zw/wp-content/uploads/2025/06/President-at-Pari1.jpg",
      "imageHint": "hospital visit"
    },
    {
      "id": "gallery-health-3",
      "altText": "President inside a newly equipped hospital wing.",
      "imageUrl": "https://www.zimlive.com/wp-content/uploads/2025/06/IMG_1761-1200x800.jpeg",
      "imageHint": "hospital equipment"
    },
    {
      "id": "gallery-health-4",
      "altText": "Opening event of the Karanda Bridge.",
      "imageUrl": "https://news.pindula.co.zw/wp-content/uploads/2021/04/Karanda-Bridge-Opening-Event-April-2021.jpg",
      "imageHint": "bridge opening"
    },
    {
      "id": "gallery-health-5",
      "altText": "President looking at new hospital equipment.",
      "imageUrl": "https://www.zimlive.com/wp-content/uploads/2025/06/IMG_1761.jpeg",
      "imageHint": "hospital equipment"
    },
    {
      "id": "gallery-health-6",
      "altText": "President at a healthcare facility.",
      "imageUrl": "https://newsreelzimbabwe.co.zw/wp-content/uploads/2025/06/1000089587-1024x717.jpg",
      "imageHint": "healthcare facility"
    },
    {
      "id": "gallery-agri-1",
      "altText": "President inspecting a farm.",
      "imageUrl": "https://www.zbcnews.co.zw/wp-content/uploads/2025/03/IMG-20250322-WA0028.jpg",
      "imageHint": "farm inspection"
    },
    {
      "id": "gallery-agri-2",
      "altText": "A cotton farming field.",
      "imageUrl": "https://www.zimlive.com/wp-content/uploads/2022/12/cotton-farming.jpg",
      "imageHint": "cotton farming"
    },
    {
      "id": "gallery-agri-3",
      "altText": "The Pfumvudza programme.",
      "imageUrl": "https://masvingomirror.com/wp-content/uploads/2022/09/Pfumvudza1.webp",
      "imageHint": "agriculture program"
    },
    {
      "id": "gallery-agri-4",
      "altText": "President at an agricultural event.",
      "imageUrl": "https://www.zbcnews.co.zw/wp-content/uploads/2025/03/lisa1.jpg",
      "imageHint": "agricultural event"
    },
    {
      "id": "gallery-agri-5",
      "altText": "Distribution of bikes for an agricultural program.",
      "imageUrl": "https://www.heraldonline.co.zw/wp-content/uploads/site//2/Bikes.jpg",
      "imageHint": "agriculture program"
    },
    {
      "id": "gallery-agri-6",
      "altText": "The Pfumvudza program launch.",
      "imageUrl": "https://www.heraldonline.co.zw/wp-content/uploads/sites/2/2024/10/Pfumvudza-1.jpg",
      "imageHint": "program launch"
    },
    {
      "id": "gallery-airport-1",
      "altText": "The new Robert Gabriel Mugabe International Airport terminal.",
      "imageUrl": "https://resa.aero/wp-content/uploads/2023/12/Capture-2.jpg",
      "imageHint": "airport terminal"
    },
    {
      "id": "gallery-airport-2",
      "altText": "Inside the new airport terminal.",
      "imageUrl": "https://www.acz.co.zw/assets/uploads/2023/image/3dcec9fa-a33f-4cd2-b58f-2d07cdf34553.jpg",
      "imageHint": "airport interior"
    },
    {
      "id": "gallery-airport-3",
      "altText": "A view of the new airport terminal.",
      "imageUrl": "https://www.infomin.org.zw/wp-content/uploads/2024/08/IMG_9013-2.jpg",
      "imageHint": "airport exterior"
    },
    {
      "id": "gallery-airport-4",
      "altText": "The modern design of the new airport terminal.",
      "imageUrl": "https://www.zimbabwesituation.com/wp-content/uploads/2023/07/Untitled-49.jpg",
      "imageHint": "airport design"
    },
    {
      "id": "gallery-airport-5",
      "altText": "An aerial view of the airport.",
      "imageUrl": "https://www.freightnews.co.za/files/styles/article_large/public/article/headline/2021-09/hre2.jpg?h=84172557&itok=r_Rh6NtO",
      "imageHint": "airport aerial"
    },
    {
      "id": "gallery-airport-6",
      "altText": "The R.G. Mugabe airport.",
      "imageUrl": "https://apta.biz/wp-content/uploads/2023/07/rgmairport.jpg",
      "imageHint": "airport building"
    },
    {
      "id": "gallery-edu-1",
      "altText": "Graduation ceremony at a state university.",
      "imageUrl": "https://pbs.twimg.com/media/F85iqZhXAAIhbuA.jpg",
      "imageHint": "graduation ceremony"
    },
    {
      "id": "gallery-edu-2",
      "altText": "An innovation hub at a university.",
      "imageUrl": "https://www.hit.ac.zw/wp-content/uploads/2025/09/549198493_1373754208084140_3282227024034345783_n.jpg",
      "imageHint": "innovation hub"
    },
    {
      "id": "gallery-edu-3",
      "altText": "Inside a university innovation hub.",
      "imageUrl": "https://www.hit.ac.zw/images/news/innovation-hub-9.jpg",
      "imageHint": "innovation hub"
    },
    {
      "id": "gallery-edu-4",
      "altText": "Students at a graduation ceremony.",
      "imageUrl": "https://www.heraldonline.co.zw/wp-content/uploads/site//2/WhatsApp-Image-2023-10-20-at-17.21.48-680x380-1.jpeg",
      "imageHint": "graduation students"
    },
    {
      "id": "gallery-edu-5",
      "altText": "The HIT university campus.",
      "imageUrl": "https://www.heraldonline.co.zw/wp-content/uploads/2025/09/HIT2-1.jpg",
      "imageHint": "university campus"
    },
    {
      "id": "gallery-edu-6",
      "altText": "A building at HIT university.",
      "imageUrl": "https://www.heraldonline.co.zw/wp-content/uploads/2025/09/HIT1-1.jpg",
      "imageHint": "university building"
    },
    {
      "id": "gallery-nds1-1",
      "altText": "President Mnangagwa launching the NDS1.",
      "imageUrl": "https://insiderzim.com/wp-content/uploads/Mnangagwa-launches-NDS1.jpg",
      "imageHint": "policy launch"
    },
    {
      "id": "gallery-nds1-2",
      "altText": "President Mnangagwa giving a speech.",
      "imageUrl": "https://i0.wp.com/businesstimes.co.zw/wp-content/uploads/2018/09/201804africa_zimbabwe_mnangagwa_sona.jpg?resize=780%2C470&ssl=1",
      "imageHint": "president speech"
    },
    {
      "id": "gallery-nds1-3",
      "altText": "The launch of the National Development Strategy 1.",
      "imageUrl": "https://startupbiz.co.zw/wp-content/uploads/2020/11/National-Development-Strategy-1-launched.jpg",
      "imageHint": "strategy launch"
    },
    {
      "id": "gallery-nds1-4",
      "altText": "The National Development Strategy document.",
      "imageUrl": "https://www.heraldonline.co.zw/wp-content/uploads/sites/3/2020/11/National-dev-strategy.jpg",
      "imageHint": "document strategy"
    },
    {
      "id": "gallery-nds1-5",
      "altText": "President Mnangagwa at the NDS1 launch.",
      "imageUrl": "https://www.zimbabwesituation.com/wp-content/uploads/2020/11/1511-1-1-ED-MNANGAGWA.jpg",
      "imageHint": "policy launch"
    },
    {
      "id": "gallery-nds1-6",
      "altText": "President Mnangagwa during a speech.",
      "imageUrl": "https://i0.wp.com/businesstimes.co.zw/wp-content/uploads/2018/09/201804africa_zimbabwe_mnangagwa_sona.jpg?amp%3Bssl=1&fit=800%2C607",
      "imageHint": "president speech"
    }
  ],
};


export default function SeedDatabasePage() {
  const firestore = useFirestore();
  const [isSeeding, setIsSeeding] = useState(false);
  const [status, setStatus] = useState("Ready to seed database.");

  const handleSeedDatabase = async () => {
    setIsSeeding(true);
    setStatus("Seeding database... this may take a moment.");

    try {
      const batch = writeBatch(firestore);
      const imagesCollection = collection(firestore, "images");

      placeholderImagesData.placeholderImages.forEach((image) => {
        const docRef = doc(imagesCollection, image.id);
        const { id, ...imageData } = image; // Exclude id from the document data
        batch.set(docRef, imageData);
      });

      await batch.commit();
      setStatus("Database seeded successfully!");
    } catch (error) {
      console.error("Error seeding database:", error);
      setStatus(`Error seeding database: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">Database Seeder</h1>
      <p className="text-muted-foreground mb-8">
        Click the button below to populate your Firestore database with the initial image data.
        You only need to do this once.
      </p>
      <Button onClick={handleSeedDatabase} disabled={isSeeding}>
        {isSeeding ? "Seeding..." : "Seed Database"}
      </Button>
      <p className="mt-4 text-sm text-muted-foreground">{status}</p>
    </div>
  );
}

    