import { ScrollView } from "react-native";

import Gradient from "../../components/Gradient";
import MoviesList from "../../components/MoviesList";

export default function HomeScreen() {

  return (
    <Gradient>
      <ScrollView style={{ flex: 1, paddingVertical: 8, }}>

        <MoviesList collection="TopRated" section='Top Rated' />
        <MoviesList collection="Latest" section='Latest releases' />
        <MoviesList collection="Upcoming" section='Upcoming' />
        <MoviesList
          collection="BetweenDates"
          section='Good old 2000s'
          options={{ from: '2000-02-02', to: '2010-02-02' }}
        />
        <MoviesList
          collection="BetweenDates"
          section='Back to 70s'
          options={{ from: '1970-01-01', to: '1980-01-01' }}
        />
      </ScrollView>

    </Gradient>
  );
}