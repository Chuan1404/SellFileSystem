import { Container } from "@mui/material";
import { Banner, MediaList, TypeTags } from "../components";

export default function Home() {
  return (
    <main id="home_page">
      <Banner class="banner" />
      <Container>
        <MediaList />
      </Container>
    </main>
  );
}
