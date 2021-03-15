--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.21
-- Dumped by pg_dump version 9.6.21

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
-- Data for Name: workspaces; Type: TABLE DATA; Schema: public; Owner: kong
--

COPY public.workspaces (id, name, comment, created_at, meta, config) FROM stdin;
9186135a-a5c5-44dc-accd-c3ef80fb4246	default	\N	2021-02-23 17:35:46+00	\N	\N
\.


--
-- Data for Name: consumers; Type: TABLE DATA; Schema: public; Owner: kong
--

COPY public.consumers (id, created_at, username, custom_id, tags, ws_id) FROM stdin;
98e3c268-87be-4bcd-a6b5-ea054a3263f9	2021-02-25 00:46:52+00	johndoe@test.com	11	\N	9186135a-a5c5-44dc-accd-c3ef80fb4246
\.


--
-- Data for Name: acls; Type: TABLE DATA; Schema: public; Owner: kong
--

COPY public.acls (id, created_at, consumer_id, "group", cache_key, tags, ws_id) FROM stdin;
\.


--
-- Data for Name: acme_storage; Type: TABLE DATA; Schema: public; Owner: kong
--

COPY public.acme_storage (id, key, value, created_at, ttl) FROM stdin;
\.


--
-- Data for Name: basicauth_credentials; Type: TABLE DATA; Schema: public; Owner: kong
--

COPY public.basicauth_credentials (id, created_at, consumer_id, username, password, tags, ws_id) FROM stdin;
\.


--
-- Data for Name: ca_certificates; Type: TABLE DATA; Schema: public; Owner: kong
--

COPY public.ca_certificates (id, created_at, cert, tags, cert_digest) FROM stdin;
\.


--
-- Data for Name: certificates; Type: TABLE DATA; Schema: public; Owner: kong
--

COPY public.certificates (id, created_at, cert, key, tags, ws_id, cert_alt, key_alt) FROM stdin;
\.


--
-- Data for Name: cluster_events; Type: TABLE DATA; Schema: public; Owner: kong
--

COPY public.cluster_events (id, node_id, at, nbf, expire_at, channel, data) FROM stdin;
\.


--
-- Data for Name: clustering_data_planes; Type: TABLE DATA; Schema: public; Owner: kong
--

COPY public.clustering_data_planes (id, hostname, ip, last_seen, config_hash, ttl, version, sync_status) FROM stdin;
\.


--
-- Data for Name: hmacauth_credentials; Type: TABLE DATA; Schema: public; Owner: kong
--

COPY public.hmacauth_credentials (id, created_at, consumer_id, username, secret, tags, ws_id) FROM stdin;
\.


--
-- Data for Name: jwt_secrets; Type: TABLE DATA; Schema: public; Owner: kong
--

COPY public.jwt_secrets (id, created_at, consumer_id, key, secret, algorithm, rsa_public_key, tags, ws_id) FROM stdin;
\.


--
-- Data for Name: keyauth_credentials; Type: TABLE DATA; Schema: public; Owner: kong
--

COPY public.keyauth_credentials (id, created_at, consumer_id, key, tags, ttl, ws_id) FROM stdin;
a280e653-4418-4c5a-a9a8-91fc37aa864c	2021-02-25 00:46:52+00	98e3c268-87be-4bcd-a6b5-ea054a3263f9	f5zMkllAOz57PN7hGVjqW8vk9D8kdHRx	\N	\N	9186135a-a5c5-44dc-accd-c3ef80fb4246
\.


--
-- Data for Name: locks; Type: TABLE DATA; Schema: public; Owner: kong
--

COPY public.locks (key, owner, ttl) FROM stdin;
\.


--
-- Data for Name: oauth2_credentials; Type: TABLE DATA; Schema: public; Owner: kong
--

COPY public.oauth2_credentials (id, created_at, name, consumer_id, client_id, client_secret, redirect_uris, tags, client_type, hash_secret, ws_id) FROM stdin;
\.


--
-- Data for Name: services; Type: TABLE DATA; Schema: public; Owner: kong
--

COPY public.services (id, created_at, updated_at, name, retries, protocol, host, port, path, connect_timeout, write_timeout, read_timeout, tags, client_certificate_id, tls_verify, tls_verify_depth, ca_certificates, ws_id) FROM stdin;
bba5433e-cbdd-463d-9419-757d6b47562a	2021-02-24 09:11:45+00	2021-02-24 09:11:45+00	auth	5	http	auth	80	\N	60000	60000	60000	\N	\N	\N	\N	\N	9186135a-a5c5-44dc-accd-c3ef80fb4246
6b15914a-0712-4855-adeb-61571221c6d4	2021-02-24 09:12:35+00	2021-02-24 09:12:35+00	campaigns	5	http	campaigns	80	\N	60000	60000	60000	\N	\N	\N	\N	\N	9186135a-a5c5-44dc-accd-c3ef80fb4246
a1152694-cd1d-4f53-94d2-d60e2ef42d48	2021-02-24 23:56:21+00	2021-02-24 23:56:21+00	users	5	http	users	80	\N	60000	60000	60000	\N	\N	\N	\N	\N	9186135a-a5c5-44dc-accd-c3ef80fb4246
\.


--
-- Data for Name: oauth2_authorization_codes; Type: TABLE DATA; Schema: public; Owner: kong
--

COPY public.oauth2_authorization_codes (id, created_at, credential_id, service_id, code, authenticated_userid, scope, ttl, challenge, challenge_method, ws_id) FROM stdin;
\.


--
-- Data for Name: oauth2_tokens; Type: TABLE DATA; Schema: public; Owner: kong
--

COPY public.oauth2_tokens (id, created_at, credential_id, service_id, access_token, refresh_token, token_type, expires_in, authenticated_userid, scope, ttl, ws_id) FROM stdin;
\.


--
-- Data for Name: parameters; Type: TABLE DATA; Schema: public; Owner: kong
--

COPY public.parameters (key, value, created_at) FROM stdin;
cluster_id	bf829975-fd4c-454b-8e83-90803c84891a	\N
\.


--
-- Data for Name: routes; Type: TABLE DATA; Schema: public; Owner: kong
--

COPY public.routes (id, created_at, updated_at, name, service_id, protocols, methods, hosts, paths, snis, sources, destinations, regex_priority, strip_path, preserve_host, tags, https_redirect_status_code, headers, path_handling, ws_id, request_buffering, response_buffering) FROM stdin;
406a147b-16c2-4ff0-a770-dfeea28ec788	2021-02-24 09:28:32+00	2021-02-24 09:28:32+00	campaigns.index	6b15914a-0712-4855-adeb-61571221c6d4	{http,https}	{GET,OPTIONS}	\N	{/api/campaigns}	\N	\N	\N	0	f	f	\N	426	\N	v0	9186135a-a5c5-44dc-accd-c3ef80fb4246	t	t
242f769c-a9df-41a6-8e33-fadbf31abafc	2021-02-24 10:34:48+00	2021-02-24 10:34:48+00	campaigns.show	6b15914a-0712-4855-adeb-61571221c6d4	{http,https}	{GET,OPTIONS}	\N	{"/api/campaigns/\\\\S+"}	\N	\N	\N	0	f	f	\N	426	\N	v0	9186135a-a5c5-44dc-accd-c3ef80fb4246	t	t
5c31c924-e777-48c3-b4cb-7de3de246741	2021-02-24 15:31:46+00	2021-02-24 15:31:46+00	campaigns.update	6b15914a-0712-4855-adeb-61571221c6d4	{http,https}	{PATCH,OPTIONS}	\N	{"/api/campaigns/\\\\+S"}	\N	\N	\N	0	f	f	\N	426	\N	v0	9186135a-a5c5-44dc-accd-c3ef80fb4246	t	t
84c53087-7b0f-47c3-a7ca-5bce79672674	2021-02-24 15:32:41+00	2021-02-24 15:32:41+00	campaigns.destroy	6b15914a-0712-4855-adeb-61571221c6d4	{http,https}	{DELETE,OPTIONS}	\N	{"/api/campaigns/\\\\+S"}	\N	\N	\N	0	f	f	\N	426	\N	v0	9186135a-a5c5-44dc-accd-c3ef80fb4246	t	t
478da2d3-3226-4fdc-a60c-c417ff5d9848	2021-02-24 15:35:11+00	2021-02-24 15:35:11+00	login	bba5433e-cbdd-463d-9419-757d6b47562a	{http,https}	{POST,OPTIONS}	\N	{/api/login}	\N	\N	\N	0	f	f	\N	426	\N	v0	9186135a-a5c5-44dc-accd-c3ef80fb4246	t	t
3232952d-3314-4076-81bf-f32a4b8876b9	2021-02-24 15:35:28+00	2021-02-24 15:35:28+00	register	bba5433e-cbdd-463d-9419-757d6b47562a	{http,https}	{POST,OPTIONS}	\N	{/api/register}	\N	\N	\N	0	f	f	\N	426	\N	v0	9186135a-a5c5-44dc-accd-c3ef80fb4246	t	t
601d7a56-5caf-4aac-8d0c-587778c5db34	2021-02-24 15:37:32+00	2021-02-24 15:37:32+00	password.email	bba5433e-cbdd-463d-9419-757d6b47562a	{http,https}	{POST,OPTIONS}	\N	{/api/password/email}	\N	\N	\N	0	f	f	\N	426	\N	v0	9186135a-a5c5-44dc-accd-c3ef80fb4246	t	t
69800c4a-bc97-46f2-83e7-3beb3a4dbd14	2021-02-24 15:38:06+00	2021-02-24 15:38:06+00	password.reset	bba5433e-cbdd-463d-9419-757d6b47562a	{http,https}	{POST,OPTIONS}	\N	{/api/password/reset}	\N	\N	\N	0	f	f	\N	426	\N	v0	9186135a-a5c5-44dc-accd-c3ef80fb4246	t	t
dae996fc-ecbb-494b-9648-7fa7cc9a01f2	2021-02-24 15:47:45+00	2021-02-24 15:47:45+00	campaigns.store	6b15914a-0712-4855-adeb-61571221c6d4	{http,https}	{POST,OPTIONS}	\N	{/api/campaigns}	\N	\N	\N	0	f	f	\N	426	\N	v0	9186135a-a5c5-44dc-accd-c3ef80fb4246	t	t
eca63403-0d79-4479-933f-de959f48b0b9	2021-02-24 20:13:45+00	2021-02-24 20:13:45+00	files.store	6b15914a-0712-4855-adeb-61571221c6d4	{http,https}	{POST,OPTIONS}	\N	{/api/files}	\N	\N	\N	0	f	f	\N	426	\N	v0	9186135a-a5c5-44dc-accd-c3ef80fb4246	t	t
aaea4713-71d2-460a-8dc4-b4ff9a979fe1	2021-02-25 00:39:28+00	2021-02-25 00:39:28+00	users.update	a1152694-cd1d-4f53-94d2-d60e2ef42d48	{http,https}	{PATCH,OPTIONS}	\N	{"/api/users/\\\\d+"}	\N	\N	\N	0	f	f	\N	426	\N	v0	9186135a-a5c5-44dc-accd-c3ef80fb4246	t	t
341a3fdf-375e-4930-941b-f83e20561d73	2021-02-25 09:01:46+00	2021-02-25 09:06:07+00	users.update.adress	a1152694-cd1d-4f53-94d2-d60e2ef42d48	{http,https}	{PATCH,OPTIONS}	\N	{"/api/users/\\\\d+/adress/"}	\N	\N	\N	0	f	f	\N	426	\N	v0	9186135a-a5c5-44dc-accd-c3ef80fb4246	t	t
\.


--
-- Data for Name: plugins; Type: TABLE DATA; Schema: public; Owner: kong
--

COPY public.plugins (id, created_at, name, consumer_id, service_id, route_id, config, enabled, cache_key, protocols, tags, ws_id) FROM stdin;
091db1c8-e902-4089-8476-78c310f6b836	2021-02-24 09:22:27+00	proxy-cache	\N	\N	\N	{"memory": {"dictionary_name": "kong_db_cache"}, "strategy": "memory", "cache_ttl": 300, "storage_ttl": null, "content_type": ["text/plain", "application/json"], "vary_headers": null, "cache_control": false, "response_code": [200], "request_method": ["GET", "HEAD"], "vary_query_params": null}	t	plugins:proxy-cache:::::9186135a-a5c5-44dc-accd-c3ef80fb4246	{grpc,grpcs,http,https}	\N	9186135a-a5c5-44dc-accd-c3ef80fb4246
bf9eafc2-d2e1-411d-9a12-65e0b2f66c8f	2021-02-25 00:17:21+00	cors	\N	\N	\N	{"headers": null, "max_age": null, "methods": ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS", "TRACE", "CONNECT"], "origins": ["*"], "credentials": false, "exposed_headers": null, "preflight_continue": false}	t	plugins:cors:::::9186135a-a5c5-44dc-accd-c3ef80fb4246	{grpc,grpcs,http,https}	\N	9186135a-a5c5-44dc-accd-c3ef80fb4246
\.


--
-- Data for Name: ratelimiting_metrics; Type: TABLE DATA; Schema: public; Owner: kong
--

COPY public.ratelimiting_metrics (identifier, period, period_date, service_id, route_id, value, ttl) FROM stdin;
\.


--
-- Data for Name: response_ratelimiting_metrics; Type: TABLE DATA; Schema: public; Owner: kong
--

COPY public.response_ratelimiting_metrics (identifier, period, period_date, service_id, route_id, value) FROM stdin;
\.


--
-- Data for Name: schema_meta; Type: TABLE DATA; Schema: public; Owner: kong
--

COPY public.schema_meta (key, subsystem, last_executed, executed, pending) FROM stdin;
schema_meta	session	001_add_ttl_index	{000_base_session,001_add_ttl_index}	\N
schema_meta	acl	004_212_to_213	{000_base_acl,002_130_to_140,003_200_to_210,004_212_to_213}	{}
schema_meta	response-ratelimiting	000_base_response_rate_limiting	{000_base_response_rate_limiting}	\N
schema_meta	bot-detection	001_200_to_210	{001_200_to_210}	{}
schema_meta	acme	000_base_acme	{000_base_acme}	\N
schema_meta	core	013_220_to_230	{000_base,003_100_to_110,004_110_to_120,005_120_to_130,006_130_to_140,007_140_to_150,008_150_to_200,009_200_to_210,010_210_to_211,011_212_to_213,012_213_to_220,013_220_to_230}	{}
schema_meta	rate-limiting	004_200_to_210	{000_base_rate_limiting,003_10_to_112,004_200_to_210}	\N
schema_meta	hmac-auth	003_200_to_210	{000_base_hmac_auth,002_130_to_140,003_200_to_210}	{}
schema_meta	oauth2	005_210_to_211	{000_base_oauth2,003_130_to_140,004_200_to_210,005_210_to_211}	{}
schema_meta	ip-restriction	001_200_to_210	{001_200_to_210}	{}
schema_meta	jwt	003_200_to_210	{000_base_jwt,002_130_to_140,003_200_to_210}	{}
schema_meta	basic-auth	003_200_to_210	{000_base_basic_auth,002_130_to_140,003_200_to_210}	{}
schema_meta	key-auth	003_200_to_210	{000_base_key_auth,002_130_to_140,003_200_to_210}	{}
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: kong
--

COPY public.sessions (id, session_id, expires, data, created_at, ttl) FROM stdin;
\.


--
-- Data for Name: snis; Type: TABLE DATA; Schema: public; Owner: kong
--

COPY public.snis (id, created_at, name, certificate_id, tags, ws_id) FROM stdin;
\.


--
-- Data for Name: tags; Type: TABLE DATA; Schema: public; Owner: kong
--

COPY public.tags (entity_id, entity_name, tags) FROM stdin;
bba5433e-cbdd-463d-9419-757d6b47562a	services	\N
6b15914a-0712-4855-adeb-61571221c6d4	services	\N
091db1c8-e902-4089-8476-78c310f6b836	plugins	\N
406a147b-16c2-4ff0-a770-dfeea28ec788	routes	\N
242f769c-a9df-41a6-8e33-fadbf31abafc	routes	\N
5c31c924-e777-48c3-b4cb-7de3de246741	routes	\N
84c53087-7b0f-47c3-a7ca-5bce79672674	routes	\N
478da2d3-3226-4fdc-a60c-c417ff5d9848	routes	\N
3232952d-3314-4076-81bf-f32a4b8876b9	routes	\N
601d7a56-5caf-4aac-8d0c-587778c5db34	routes	\N
69800c4a-bc97-46f2-83e7-3beb3a4dbd14	routes	\N
dae996fc-ecbb-494b-9648-7fa7cc9a01f2	routes	\N
eca63403-0d79-4479-933f-de959f48b0b9	routes	\N
a1152694-cd1d-4f53-94d2-d60e2ef42d48	services	\N
bf9eafc2-d2e1-411d-9a12-65e0b2f66c8f	plugins	\N
aaea4713-71d2-460a-8dc4-b4ff9a979fe1	routes	\N
98e3c268-87be-4bcd-a6b5-ea054a3263f9	consumers	\N
a280e653-4418-4c5a-a9a8-91fc37aa864c	keyauth_credentials	\N
341a3fdf-375e-4930-941b-f83e20561d73	routes	\N
\.


--
-- Data for Name: upstreams; Type: TABLE DATA; Schema: public; Owner: kong
--

COPY public.upstreams (id, created_at, name, hash_on, hash_fallback, hash_on_header, hash_fallback_header, hash_on_cookie, hash_on_cookie_path, slots, healthchecks, tags, algorithm, host_header, client_certificate_id, ws_id) FROM stdin;
\.


--
-- Data for Name: targets; Type: TABLE DATA; Schema: public; Owner: kong
--

COPY public.targets (id, created_at, upstream_id, target, weight, tags, ws_id) FROM stdin;
\.


--
-- Data for Name: ttls; Type: TABLE DATA; Schema: public; Owner: kong
--

COPY public.ttls (primary_key_value, primary_uuid_value, table_name, primary_key_name, expire_at) FROM stdin;
\.


--
-- PostgreSQL database dump complete
--

