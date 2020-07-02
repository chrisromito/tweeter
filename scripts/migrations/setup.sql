--
-- PostgreSQL database dump
--

-- Dumped from database version 10.11
-- Dumped by pg_dump version 10.11

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

ALTER TABLE IF EXISTS ONLY public.post DROP CONSTRAINT IF EXISTS post_user_id_fkey;
ALTER TABLE IF EXISTS ONLY public.post_map DROP CONSTRAINT IF EXISTS post_map_post_id_fkey;
ALTER TABLE IF EXISTS ONLY public.post_map DROP CONSTRAINT IF EXISTS post_map_from_post_id_fkey;
DROP INDEX IF EXISTS public."IDX_session_expire";
ALTER TABLE IF EXISTS ONLY public.app_user DROP CONSTRAINT IF EXISTS user_username_key;
ALTER TABLE IF EXISTS ONLY public.app_user DROP CONSTRAINT IF EXISTS user_pkey;
ALTER TABLE IF EXISTS ONLY public.app_user DROP CONSTRAINT IF EXISTS user_email_key;
ALTER TABLE IF EXISTS ONLY public.session DROP CONSTRAINT IF EXISTS session_pkey;
ALTER TABLE IF EXISTS ONLY public.session DROP CONSTRAINT IF EXISTS session_id_key;
ALTER TABLE IF EXISTS ONLY public.post DROP CONSTRAINT IF EXISTS post_pkey;
ALTER TABLE IF EXISTS ONLY public.post_map DROP CONSTRAINT IF EXISTS post_map_pkey;
ALTER TABLE IF EXISTS public.session ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.post_map ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.post ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.app_user ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE IF EXISTS public.user_id_seq;
DROP SEQUENCE IF EXISTS public.session_id_seq;
DROP TABLE IF EXISTS public.session;
DROP SEQUENCE IF EXISTS public.post_map_id_seq;
DROP TABLE IF EXISTS public.post_map;
DROP SEQUENCE IF EXISTS public.post_id_seq;
DROP TABLE IF EXISTS public.post;
DROP TABLE IF EXISTS public.app_user;
DROP EXTENSION IF EXISTS plpgsql;
DROP SCHEMA IF EXISTS public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: app_user; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.app_user (
    id integer NOT NULL,
    first_name character varying NOT NULL,
    last_name character varying NOT NULL,
    username character varying NOT NULL,
    email character varying NOT NULL,
    avatar text,
    created timestamp with time zone DEFAULT now() NOT NULL,
    updated timestamp with time zone
);


--
-- Name: post; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.post (
    id integer NOT NULL,
    user_id integer NOT NULL,
    body text NOT NULL,
    created timestamp with time zone DEFAULT now() NOT NULL,
    updated timestamp with time zone
);


--
-- Name: post_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.post_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: post_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.post_id_seq OWNED BY public.post.id;


--
-- Name: post_map; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.post_map (
    id integer NOT NULL,
    from_post_id integer,
    post_id integer NOT NULL,
    created timestamp with time zone DEFAULT now() NOT NULL,
    updated timestamp with time zone
);


--
-- Name: TABLE post_map; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.post_map IS 'Post map facilitates separation between managing post hierarchies (replies, sharing, etc)  vs. writes to the post itself.  This makes it easier to delete posts without having to worry about cascades causing table-locks in high-concurrency scenarios.  post_id denotes the target post from_post_id denotes the parent post.  Eg. A reply will have the original post as its from_post_id.';


--
-- Name: post_map_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.post_map_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: post_map_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.post_map_id_seq OWNED BY public.post_map.id;


--
-- Name: session; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.session (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL,
    id integer NOT NULL
);


--
-- Name: session_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.session_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: session_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.session_id_seq OWNED BY public.session.id;


--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.user_id_seq OWNED BY public.app_user.id;


--
-- Name: app_user id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.app_user ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Name: post id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.post ALTER COLUMN id SET DEFAULT nextval('public.post_id_seq'::regclass);


--
-- Name: post_map id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.post_map ALTER COLUMN id SET DEFAULT nextval('public.post_map_id_seq'::regclass);


--
-- Name: session id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.session ALTER COLUMN id SET DEFAULT nextval('public.session_id_seq'::regclass);


--
-- Data for Name: app_user; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.app_user (id, first_name, last_name, username, email, avatar, created, updated) VALUES (1, 'Chris', 'Romito', 'cromito', 'chrisacreative@gmail.com', NULL, '2020-07-01 17:31:23.314474-04', NULL);
INSERT INTO public.app_user (id, first_name, last_name, username, email, avatar, created, updated) VALUES (2, 'Max', 'Matthews', 'mmatthews', 'max.matthews@wearetuzag.com', NULL, '2020-07-01 17:31:23.314474-04', NULL);
INSERT INTO public.app_user (id, first_name, last_name, username, email, avatar, created, updated) VALUES (3, 'Grumpy', 'Cat', 'GrumpyCat', 'grumpy.cat@example.com', NULL, '2020-07-01 17:31:23.314474-04', NULL);
INSERT INTO public.app_user (id, first_name, last_name, username, email, avatar, created, updated) VALUES (4, 'Smudge', 'Lord', 'smudge_lord', 'smudge_lord@example.com', NULL, '2020-07-01 17:31:23.314474-04', NULL);


--
-- Data for Name: post; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.post (id, user_id, body, created, updated) VALUES (1, 1, 'My first post!', '2020-07-01 21:11:58.193196-04', NULL);
INSERT INTO public.post (id, user_id, body, created, updated) VALUES (2, 1, 'my second psot', '2020-07-02 11:38:34.520526-04', NULL);
INSERT INTO public.post (id, user_id, body, created, updated) VALUES (3, 1, 'Reply to my second post!', '2020-07-02 11:38:45.657677-04', NULL);
INSERT INTO public.post (id, user_id, body, created, updated) VALUES (5, 3, 'Grumpy cat''s first post', '2020-07-02 11:44:23.369058-04', NULL);


--
-- Data for Name: post_map; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.post_map (id, from_post_id, post_id, created, updated) VALUES (1, NULL, 1, '2020-07-01 21:12:07.476754-04', NULL);
INSERT INTO public.post_map (id, from_post_id, post_id, created, updated) VALUES (2, NULL, 2, '2020-07-02 11:38:34.532783-04', NULL);
INSERT INTO public.post_map (id, from_post_id, post_id, created, updated) VALUES (3, 2, 3, '2020-07-02 11:38:45.665926-04', NULL);
INSERT INTO public.post_map (id, from_post_id, post_id, created, updated) VALUES (5, NULL, 5, '2020-07-02 11:44:23.381056-04', NULL);


--
-- Data for Name: session; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Name: post_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.post_id_seq', 5, true);


--
-- Name: post_map_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.post_map_id_seq', 5, true);


--
-- Name: session_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.session_id_seq', 1, false);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.user_id_seq', 4, true);


--
-- Name: post_map post_map_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.post_map
    ADD CONSTRAINT post_map_pkey PRIMARY KEY (id);


--
-- Name: post post_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.post
    ADD CONSTRAINT post_pkey PRIMARY KEY (id);


--
-- Name: session session_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_id_key UNIQUE (id);


--
-- Name: session session_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);


--
-- Name: app_user user_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.app_user
    ADD CONSTRAINT user_email_key UNIQUE (email);


--
-- Name: app_user user_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.app_user
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: app_user user_username_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.app_user
    ADD CONSTRAINT user_username_key UNIQUE (username);


--
-- Name: IDX_session_expire; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "IDX_session_expire" ON public.session USING btree (expire);


--
-- Name: post_map post_map_from_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.post_map
    ADD CONSTRAINT post_map_from_post_id_fkey FOREIGN KEY (from_post_id) REFERENCES public.post(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: post_map post_map_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.post_map
    ADD CONSTRAINT post_map_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.post(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: post post_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.post
    ADD CONSTRAINT post_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.app_user(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

