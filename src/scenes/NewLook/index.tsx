import React from 'react';

import { Explore, Search, Settings } from '@mui/icons-material';
import { IconButton, Stack, Typography } from '@mui/material';

import s from './newlook.module.scss';

const NewLook = () => {
  return (
    <div className={s.container}>
      <Stack className={s.nav} gap="1.5rem">
        <IconButton className={s.icon}>
          <Explore fontSize="large" />
        </IconButton>
        <IconButton className={s.icon}>
          <Settings fontSize="large" />
        </IconButton>
        <IconButton className={s.icon}>
          <Explore fontSize="large" />
        </IconButton>
        <IconButton className={s.icon}>
          <Explore fontSize="large" />
        </IconButton>
      </Stack>

      <div className={s.left_nav}>
        <Stack
          component="header"
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h6">Cool group</Typography>

          <Stack direction="row" alignItems="center">
            <IconButton>
              <Search />
            </IconButton>
            <IconButton>
              <Settings />
            </IconButton>
          </Stack>
        </Stack>
      </div>

      <aside className={s.side_bar}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusantium
        aliquid architecto aspernatur, assumenda beatae consequuntur delectus
        deleniti dolor, doloribus dolorum eveniet ex exercitationem expedita
        explicabo harum illo ipsa ipsum iusto labore maxime modi mollitia nemo
        nulla officiis perspiciatis placeat porro quaerat quo rem similique
        tempora tempore tenetur totam veniam veritatis voluptatum. Alias
        aspernatur consectetur deleniti fugiat. Doloribus error est ipsam,
        placeat veniam veritatis? Beatae itaque iure quisquam ut vitae. A ab
        animi dicta dolor dolore dolorum eos error est facilis, illum maxime,
        minus mollitia neque nesciunt qui quis sunt tempore ullam voluptatem
        voluptates! Aut autem, consequatur cum fuga fugiat fugit id illum
        molestias, nemo, possimus quam quos recusandae saepe tempora voluptas?
        Aliquam blanditiis ex fugiat libero magni minus, nisi soluta tenetur
        vero voluptatum. Adipisci, aliquam at autem cum dicta dignissimos
        distinctio eligendi esse, est hic illo ipsam laboriosam mollitia neque
        nostrum odit pariatur praesentium quaerat quas quasi qui reiciendis sed
        sequi sint ullam unde voluptatem? A accusamus ad adipisci aspernatur
        beatae blanditiis, consectetur deleniti dolore dolorem doloribus
        eligendi error est explicabo facilis illo illum ipsum iste labore maxime
        modi nisi numquam omnis perspiciatis porro possimus provident quam
        quibusdam reiciendis reprehenderit repudiandae rerum sed sequi suscipit,
        tempore tenetur veniam voluptatem. Lorem ipsum dolor sit amet,
        consectetur adipisicing elit. Accusamus aperiam corporis culpa delectus
        deleniti dolorem eligendi exercitationem facilis fugiat harum inventore
        itaque laudantium odit officia omnis qui quibusdam quidem quis quo quod
        ratione, repellat voluptatem! Adipisci alias deleniti, dolore eum
        explicabo id impedit laboriosam laborum laudantium magni mollitia neque
        nihil qui quibusdam ratione tempora, totam veritatis! Adipisci,
        aspernatur consectetur corporis delectus distinctio dolorem eius error
        est eveniet explicabo ipsam labore minus modi non nostrum numquam
        possimus, saepe tempora tenetur ullam? Ab aperiam assumenda cum
        dignissimos dolor fugit numquam quia totam veritatis? Aut cumque earum
        eum laboriosam obcaecati pariatur quisquam, quo sit. Accusamus aut
        consequatur debitis dolores explicabo, fuga itaque laborum officiis quam
        reprehenderit sunt veritatis. Aliquid beatae dolor ea enim, facilis
        fugit iusto libero magni nobis odio officia officiis perferendis
        possimus provident quas, ratione reiciendis rem reprehenderit tempore
        vel velit vero voluptatum! A commodi cumque dignissimos dolore dolorum
        inventore ipsam labore molestiae odio possimus quaerat repudiandae
        sapiente, suscipit? Assumenda corporis esse illum non omnis quae quo. Ad
        atque cumque dolorem error, facilis id illo in magnam maiores nemo omnis
        quia quidem recusandae repellendus voluptatum? A asperiores aut
        consequatur consequuntur eum, expedita harum id, iste molestias nulla
        officiis optio perspiciatis, praesentium qui quod recusandae rem
        reprehenderit velit veniam voluptatem! Culpa cum delectus ducimus esse
        et, ex exercitationem expedita fugit id illo in itaque iusto laudantium
        molestias mollitia necessitatibus, obcaecati quae quidem tempora
        voluptates. Blanditiis eum id inventore mollitia, non praesentium ullam
        velit. Aliquam amet assumenda at consectetur consequuntur culpa deleniti
        doloremque excepturi explicabo, impedit itaque laboriosam maxime
        mollitia nam non perferendis rem repellendus sapiente temporibus ullam.
        Ab culpa et labore libero, modi molestiae non placeat ratione sequi
        voluptates! Consequuntur dicta eaque est eveniet ex illum labore
        laborum, maxime natus officia possimus, quia quo recusandae repudiandae
        tempora, temporibus tenetur! Ab corporis doloribus ducimus est incidunt
        laudantium nam nihil obcaecati, odit provident. A amet asperiores
        dolorem ipsam itaque, porro voluptate voluptatem. Alias animi delectus
        deserunt dolorem, dolorum fugit id laboriosam maiores, molestias nisi,
        quasi sit totam ullam? Dicta eos illo in magnam nihil nostrum officia
        provident repudiandae tempore temporibus! Dolorum, iure, necessitatibus.
        Accusamus ad adipisci consequatur culpa, delectus dicta eaque eius
        eligendi enim error eveniet ex exercitationem expedita facere fuga hic
        impedit iure iusto labore laboriosam modi molestias mollitia nihil
        nostrum odit optio quae quasi recusandae reiciendis repellendus sapiente
        sequi sunt temporibus vel, veritatis vitae voluptatem. Animi blanditiis
        consectetur, consequuntur debitis deleniti dolores fugit magnam mollitia
        nemo neque non nulla numquam officiis porro provident, quae, quaerat
        quam quia quisquam repellat saepe similique sint ut veritatis
        voluptatibus. Accusamus aliquam ducimus facere facilis incidunt itaque
        maiores sequi similique sint tenetur! Aliquam deleniti dolores est et
        laborum necessitatibus nobis quo sequi soluta. Accusamus ad animi
        asperiores at consequatur consequuntur culpa cumque delectus deleniti
        deserunt dolore dolorem doloremque dolores doloribus ea eius enim eos,
        error et explicabo id laboriosam libero magnam nemo numquam pariatur,
        possimus quam qui quisquam, saepe soluta suscipit tempora temporibus ut
        voluptate voluptatibus voluptatum? Aliquid aspernatur delectus nihil
        obcaecati optio perferendis quaerat quam sed veritatis? At ducimus fugit
        iste laudantium maiores minus nulla, perspiciatis recusandae saepe
        voluptatibus? Corporis eum hic libero perferendis qui, tempora vero.
        Amet, aspernatur autem error eum labore nemo neque suscipit. Accusantium
        ad aliquam doloremque eaque et excepturi fuga ipsam ipsum maiores nobis
        non officia, optio provident quo tempora temporibus tenetur totam ullam
        velit voluptatem. Ad animi debitis doloremque eaque earum error et ex,
        expedita facere fuga fugiat id itaque labore molestias necessitatibus
        nostrum obcaecati omnis pariatur porro praesentium provident quae
        quaerat quia quibusdam quis quisquam quos reprehenderit similique soluta
        ullam velit vitae voluptate voluptatum! Asperiores consectetur dolor
        eligendi eos excepturi, minus, molestias quod reiciendis sequi sit,
        veritatis vero! Accusantium architecto asperiores autem cupiditate
        deserunt eos id impedit ipsum labore natus numquam quam recusandae, sed
        sint ullam velit voluptatibus voluptatum! Ad adipisci amet aspernatur
        cum cumque debitis eos, eveniet explicabo facere facilis fuga iure
        libero minima nam necessitatibus nemo nihil nostrum nulla odio officiis
        optio perspiciatis possimus praesentium provident quasi ratione rerum,
        tenetur totam velit veritatis. Aperiam commodi culpa, dolore doloribus
        ducimus eveniet fugit natus sequi temporibus vitae! Accusamus ad at,
        cumque delectus ducimus eligendi enim ex facilis hic inventore maiores
        maxime minus nulla, praesentium provident voluptatem voluptates!
        Accusamus aliquid amet culpa cupiditate doloremque doloribus eaque est,
        harum incidunt ipsam iste itaque maxime neque odio placeat porro quae
        qui quibusdam quidem quod tempore totam voluptas. A, aliquam facere
        facilis iste odio odit omnis provident sapiente sed velit voluptas,
        voluptates. Aliquid, culpa distinctio dolore doloremque explicabo illum
        in incidunt, molestias necessitatibus nobis quisquam sapiente
        voluptatibus voluptatum. Amet debitis deleniti distinctio exercitationem
        fugiat nam provident quia rem. Aliquam blanditiis culpa, cum doloremque
        doloribus ducimus et expedita fuga fugiat perspiciatis praesentium unde.
        Esse facilis inventore maxime placeat reprehenderit vero! Amet dolorem
        eaque esse illo impedit inventore neque placeat quia, sed totam? Aliquam
        amet ducimus laudantium reiciendis repudiandae. Aperiam cum, earum
        eveniet ipsa numquam pariatur porro repudiandae! A, adipisci aut autem
        blanditiis deleniti distinctio dolor, dolore dolores eligendi eos error
        et excepturi fugiat iste libero maiores nemo nesciunt non nostrum nulla
        qui quo saepe sit temporibus, voluptatum. Dolorem facilis fugiat hic
        libero nobis sint tempore totam. Adipisci aperiam, atque blanditiis
        dolorem ducimus eius, est explicabo, magnam minima nisi sit tempora
        tenetur voluptates? Aliquam consequuntur cumque dolore ipsum iure
        laborum magnam porro sed. Id natus quod ratione sapiente. Ad atque
        consequuntur eos esse ex ipsum iusto numquam. Aspernatur cumque dolor
        eum fuga hic modi nam nobis nostrum obcaecati porro quaerat, quo
        reiciendis voluptatum. Delectus ducimus nobis quisquam ratione, sit
        tempora tempore. Adipisci aliquam architecto dolores doloribus ducimus
        earum, harum, impedit, optio placeat quibusdam repellat repellendus sed
        sunt totam veritatis. A ad asperiores assumenda blanditiis commodi
        cumque cupiditate dolorum et eum expedita fugiat incidunt laborum magnam
        maiores minima nihil nisi officiis, perferendis quasi reiciendis rem
        rerum similique sint temporibus tenetur veniam vitae! Assumenda
        distinctio dolorum ducimus eligendi eos ipsum labore, natus rerum ut
        vel? Asperiores assumenda ducimus et facere in ipsum magni molestias nam
        nesciunt nobis, numquam odit omnis quam repellendus rerum similique
        suscipit totam voluptate. Odio?
      </aside>
    </div>
  );
};

export default NewLook;
