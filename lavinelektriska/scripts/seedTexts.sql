-- scripts/seedTexts.sql
-- Paste this into Supabase SQL editor and run to insert/update pageTexts

BEGIN;

INSERT INTO pageTexts (text_key, text, published, updated_at) VALUES
('hero_title_line1', 'Lavin Elektriska AB', TRUE, NOW()),
('hero_title_line2', 'Din pålitliga elpartner', TRUE, NOW()),
('hero_p1', 'Sedan starten har vi jobbat på att bygga erfarenhet och kunskap inom el-branschen för att kunna erbjuda våra kunder bästa möjliga service och kvalitet.', TRUE, NOW()),
('hero_p2', 'Vi gör mer än att dra kablar. Vi förverkligar dina idéer och skapar lösningar som får ditt hem eller projekt att fungera precis som du vill. Hos oss får du en elpartner som ser helheten, bryr sig om detaljerna och alltid arbetar för en lösning som passar just dina behov.', TRUE, NOW()),
('hero_cta', 'Gratis offert', TRUE, NOW()),
('hero_feature1_title', 'Elinstallationer', TRUE, NOW()),
('hero_feature2_title', 'Renoveringar', TRUE, NOW()),
('hero_feature3_title', 'Nyproduktioner', TRUE, NOW()),
('hero_right_title', 'Varför välja oss?', TRUE, NOW()),
('hero_right_item1_title', 'Snabb respons', TRUE, NOW()),
('hero_right_item1_sub', 'Svarar inom 24 timmar', TRUE, NOW()),
('hero_right_item2_title', 'Transparent prissättning', TRUE, NOW()),
('hero_right_item2_sub', 'Inga dolda kostnader', TRUE, NOW()),
('hero_right_item3_title', 'Kvalitetsgaranti', TRUE, NOW()),
('hero_right_item3_sub', 'Garanti på allt arbete', TRUE, NOW())
ON CONFLICT (text_key) DO UPDATE
  SET text = EXCLUDED.text,
      published = EXCLUDED.published,
      updated_at = NOW();

COMMIT;
