<template>
    <Page @loaded="load" >
        <ActionBar title="Airport list"/>

        <GridLayout rows="*, auto, *" columns="*, auto, *">
                <ListView for="airport in $store.state.data" class="list-group" @itemTap="onAirportNameTap">
                  <v-template>
                    <StackLayout  class="list-group=item">
                      <Label v-bind:text="airport.airportName"/>
                    </StackLayout>
                  </v-template>
                </ListView>
			
        </GridLayout>
    </Page>
</template>

<script>
export default {
data() {
    return {
      input: {
        faaID: "",
        airportName: ""
      }
    }
},
methods: {
    onAirportNameTap: function(args) {
      alert(args.index + " " + args);
    },
    load() {
      //this.$store.dispatch("query");
      this.$store.dispatch("query").then(() => {
        this.airports = this.$store.getters.allAirports;
        console.log(this.airports);
      });
    }

}
};
</script>