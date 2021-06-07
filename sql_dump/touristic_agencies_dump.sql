--
-- PostgreSQL database dump
--

-- Dumped from database version 11.10 (Debian 11.10-1.pgdg90+1)
-- Dumped by pg_dump version 12.7

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: agency_status_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.agency_status_enum AS ENUM (
    'ACTIVE',
    'INACTIVE'
);


ALTER TYPE public.agency_status_enum OWNER TO postgres;

SET default_tablespace = '';

--
-- Name: agency; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.agency (
    id integer NOT NULL,
    name character varying(500) NOT NULL,
    description text DEFAULT ''::text NOT NULL,
    "phoneNumber" character varying(15) NOT NULL,
    status public.agency_status_enum DEFAULT 'ACTIVE'::public.agency_status_enum NOT NULL
);


ALTER TABLE public.agency OWNER TO postgres;

--
-- Name: agency_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.agency_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.agency_id_seq OWNER TO postgres;

--
-- Name: agency_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.agency_id_seq OWNED BY public.agency.id;


--
-- Name: category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.category (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.category OWNER TO postgres;

--
-- Name: category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.category_id_seq OWNER TO postgres;

--
-- Name: category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.category_id_seq OWNED BY public.category.id;


--
-- Name: direction; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.direction (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.direction OWNER TO postgres;

--
-- Name: direction_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.direction_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.direction_id_seq OWNER TO postgres;

--
-- Name: direction_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.direction_id_seq OWNED BY public.direction.id;


--
-- Name: office; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.office (
    id integer NOT NULL,
    address text NOT NULL,
    "phoneNumber" character varying(15) NOT NULL,
    "workingHours" text NOT NULL,
    "agencyId" integer NOT NULL
);


ALTER TABLE public.office OWNER TO postgres;

--
-- Name: office_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.office_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.office_id_seq OWNER TO postgres;

--
-- Name: office_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.office_id_seq OWNED BY public.office.id;


--
-- Name: tour; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tour (
    id integer NOT NULL,
    name text NOT NULL,
    description text DEFAULT ''::text NOT NULL,
    price integer NOT NULL,
    duration text NOT NULL,
    "agencyId" integer NOT NULL,
    image text
);


ALTER TABLE public.tour OWNER TO postgres;

--
-- Name: tour_categories_category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tour_categories_category (
    "tourId" integer NOT NULL,
    "categoryId" integer NOT NULL
);


ALTER TABLE public.tour_categories_category OWNER TO postgres;

--
-- Name: tour_directions_direction; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tour_directions_direction (
    "tourId" integer NOT NULL,
    "directionId" integer NOT NULL
);


ALTER TABLE public.tour_directions_direction OWNER TO postgres;

--
-- Name: tour_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tour_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tour_id_seq OWNER TO postgres;

--
-- Name: tour_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tour_id_seq OWNED BY public.tour.id;


--
-- Name: agency id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agency ALTER COLUMN id SET DEFAULT nextval('public.agency_id_seq'::regclass);


--
-- Name: category id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category ALTER COLUMN id SET DEFAULT nextval('public.category_id_seq'::regclass);


--
-- Name: direction id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.direction ALTER COLUMN id SET DEFAULT nextval('public.direction_id_seq'::regclass);


--
-- Name: office id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.office ALTER COLUMN id SET DEFAULT nextval('public.office_id_seq'::regclass);


--
-- Name: tour id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tour ALTER COLUMN id SET DEFAULT nextval('public.tour_id_seq'::regclass);


--
-- Data for Name: agency; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.agency (id, name, description, "phoneNumber", status) FROM stdin;
2	TUR	Одна з провідних туристичних компаній України. Компанія є частиною найбільшого міжнародного туристичного холдингу TUR Group, з більш ніж 10 річним досвідом роботи. Компанія пропонує пляжний, екскурсійний і гірськолижний відпочинок на масових туристичних напрямках.	380951112223	ACTIVE
3	Coralline Travel	Маючи більш ніж 25-річний професійний досвід в сфері виїзного туризму, компанія Coralline Travel пропонує на українському туристичному ринку тільки високоякісний турпродукт. Coralline Travel пропонує найкращі курорти та готелі в 28 країнах світу. Йде постійна робота по АКТИВНЕ 01.02.1994 відкриттю нових напрямків. Туроператор організовує групові та індивідуальні FIT-тури на базі власних чартерних програм і регулярних рейсів, розвиває incentive-, congress-, спортивний та інші види туризму.	380931112227	ACTIVE
\.


--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.category (id, name) FROM stdin;
1	Family
2	relax
3	shopping
4	Пляжний
5	Сімейний
6	Екскурсійний
7	Гірськолижний
8	Оздоровчий
\.


--
-- Data for Name: direction; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.direction (id, name) FROM stdin;
1	France
2	Germany
3	milan
4	france
5	italy
6	Єгипет
7	Великобританія
8	Австрія
9	Германія
10	Франція
\.


--
-- Data for Name: office; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.office (id, address, "phoneNumber", "workingHours", "agencyId") FROM stdin;
1	м. Харків, вул. 23 Серпня, 10-Б, поверх 1, офіс 4	380951234568	9:00-19:00	2
4	м. Одеса, вул. Велика Арнаутська 4, офіс 102	380931112227	10:00-18:00	3
\.


--
-- Data for Name: tour; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tour (id, name, description, price, duration, "agencyId", image) FROM stdin;
7	Таємниці Єгипту	Переваги Єгипту відомі кожному: якісний пляжний відпочинок весь рік на Середземному та Червоному морях, відмінний дайвінг, плюс різноманітна екскурсійна програма: піраміди, Сфінкс і Луксор. Все це ви знайдете в нашому турі. Харчування по системі "все включено".	12000	P10D	3	\N
8	Чай удвох або вікенд по-англійськи	Туманний Альбіон постає в уяві в образах старовинних замків, загадкових палаців, благородних джентельменів і справжніх леді, строгих традицій і дивовижних історій. Ви здивуєтеся, все це NULL літак 5 можна знайти і в наші дні. Наш тур пропонує не тільки огляд основних визначних пам'яток Англії, але і відмінний шопінг, різноманітну кухню, а також відвідування футбольного матчу.	15000	P8D	2	\N
9	Засніжені Альпи	Карта гірськолижних трас Австрії різноманітна. На ній можна знайти достатню кількість маршрутів різної складності для новачків, лижників середнього рівня і професійних спортсменів. В даному турі ми пропонуємо на вибір кілька гірськолижних курортів в районі Зальцбурга і Тіролю.	9000	P6D	3	\N
10	Оздоровчий СПА тур	Такий тур припаде до душі тим, хто любить не тільки насолодитися пляжним або екскурсійним відпочинком, а й повернутися з відпустки з поліпшеним здоров'ям. В нашому турі на лікувальні курорти Франції ми пропонуємо бальнеотерапію - все, що пов'язано з термальними природними водами для зовнішнього і внутрішнього застосування.	8000	P0D	2	\N
\.


--
-- Data for Name: tour_categories_category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tour_categories_category ("tourId", "categoryId") FROM stdin;
7	4
7	5
8	6
9	6
9	7
10	6
10	8
\.


--
-- Data for Name: tour_directions_direction; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tour_directions_direction ("tourId", "directionId") FROM stdin;
7	6
8	7
9	8
9	9
10	10
10	9
\.


--
-- Name: agency_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.agency_id_seq', 4, true);


--
-- Name: category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.category_id_seq', 8, true);


--
-- Name: direction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.direction_id_seq', 10, true);


--
-- Name: office_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.office_id_seq', 4, true);


--
-- Name: tour_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tour_id_seq', 10, true);


--
-- Name: office PK_200185316ba169fda17e3b6ba00; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.office
    ADD CONSTRAINT "PK_200185316ba169fda17e3b6ba00" PRIMARY KEY (id);


--
-- Name: tour_categories_category PK_94206b5d50cab4f57da768ff450; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tour_categories_category
    ADD CONSTRAINT "PK_94206b5d50cab4f57da768ff450" PRIMARY KEY ("tourId", "categoryId");


--
-- Name: tour PK_972cd7fa4ec39286068130fa3f7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tour
    ADD CONSTRAINT "PK_972cd7fa4ec39286068130fa3f7" PRIMARY KEY (id);


--
-- Name: category PK_9c4e4a89e3674fc9f382d733f03; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY (id);


--
-- Name: agency PK_ab1244724d1c216e9720635a2e5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agency
    ADD CONSTRAINT "PK_ab1244724d1c216e9720635a2e5" PRIMARY KEY (id);


--
-- Name: direction PK_cd7122416e3f733711b5cfa2924; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.direction
    ADD CONSTRAINT "PK_cd7122416e3f733711b5cfa2924" PRIMARY KEY (id);


--
-- Name: tour_directions_direction PK_f6f7073af10f5b514066358eee6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tour_directions_direction
    ADD CONSTRAINT "PK_f6f7073af10f5b514066358eee6" PRIMARY KEY ("tourId", "directionId");


--
-- Name: category UQ_23c05c292c439d77b0de816b500; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE (name);


--
-- Name: direction UQ_edf14d6421b3ae4eaf7517cd8a7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.direction
    ADD CONSTRAINT "UQ_edf14d6421b3ae4eaf7517cd8a7" UNIQUE (name);


--
-- Name: IDX_0d4c094c0d41ae182b361e97bf; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_0d4c094c0d41ae182b361e97bf" ON public.tour_categories_category USING btree ("categoryId");


--
-- Name: IDX_0e7feb624b3ef4310bad81cf83; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_0e7feb624b3ef4310bad81cf83" ON public.tour_categories_category USING btree ("tourId");


--
-- Name: IDX_347bbcaa2259c5db3aee3caafa; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_347bbcaa2259c5db3aee3caafa" ON public.tour_directions_direction USING btree ("directionId");


--
-- Name: IDX_abcf913f9e0cdd69c58acb7c8c; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_abcf913f9e0cdd69c58acb7c8c" ON public.tour_directions_direction USING btree ("tourId");


--
-- Name: tour_categories_category FK_0d4c094c0d41ae182b361e97bf6; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tour_categories_category
    ADD CONSTRAINT "FK_0d4c094c0d41ae182b361e97bf6" FOREIGN KEY ("categoryId") REFERENCES public.category(id) ON DELETE CASCADE;


--
-- Name: tour_categories_category FK_0e7feb624b3ef4310bad81cf836; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tour_categories_category
    ADD CONSTRAINT "FK_0e7feb624b3ef4310bad81cf836" FOREIGN KEY ("tourId") REFERENCES public.tour(id) ON DELETE CASCADE;


--
-- Name: tour_directions_direction FK_347bbcaa2259c5db3aee3caafa4; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tour_directions_direction
    ADD CONSTRAINT "FK_347bbcaa2259c5db3aee3caafa4" FOREIGN KEY ("directionId") REFERENCES public.direction(id) ON DELETE CASCADE;


--
-- Name: office FK_7fc741b4c54efbb6350a5c75439; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.office
    ADD CONSTRAINT "FK_7fc741b4c54efbb6350a5c75439" FOREIGN KEY ("agencyId") REFERENCES public.agency(id);


--
-- Name: tour_directions_direction FK_abcf913f9e0cdd69c58acb7c8c2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tour_directions_direction
    ADD CONSTRAINT "FK_abcf913f9e0cdd69c58acb7c8c2" FOREIGN KEY ("tourId") REFERENCES public.tour(id) ON DELETE CASCADE;


--
-- Name: tour FK_ee78fa6978940a0e9cc471c4042; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tour
    ADD CONSTRAINT "FK_ee78fa6978940a0e9cc471c4042" FOREIGN KEY ("agencyId") REFERENCES public.agency(id);


--
-- PostgreSQL database dump complete
--

