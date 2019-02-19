<template>
    <Page @loaded="loadAirports">
        <ActionBar title="Airport list" class="action-bar"/>

  <ScrollView orientation="vertical">
      <StackLayout height="100%">
        <StackLayout width="95%" marginTop="15" borderRadius="5" paddingTop="5">
   
                <ListView for="airport in airports" class="list-group"  @itemTap="onAirportNameTap">
                  <v-template>
                    <GridLayout columns="auto,*" rows="*, *" paddingLeft="10" paddingTop="5" paddingBottom="5" paddingRight="5">
                      <StackLayout width="95%" marginTop="15" borderRadius="5" paddingTop="5"  class="list-group-item">
                        <Label v-bind:text="airport.arprtfaaID + ' ' + airport.airportName" class="list-group-item-heading"/>
                      </StackLayout>
                    </GridLayout>
                  </v-template>
                </ListView>
        </StackLayout>
      </StackLayout>
  </ScrollView>



    </Page>
</template>

<script>
export default {
  data() {
     return {
        faaID: "",
        airportName: "",
        airports: []
    }
  },
  methods: {
    loadAirports() {
  
      this.$store.dispatch("queryAirports").then(() => {
        this.airports = this.$store.getters.allAirports;
        //console.log(this.airports);
      });

    },

    onAirportNameTap(args) {
        console.log("args.item: ", args.item.arprtfaaID);
        this.$store.commit("matchRunwaysWithAirport", args.item.arprtfaaID);
        console.log("Completed calling to commit matchRunwaysWithAirport");
       this.$modal.close(args.item);

    }
  /*  load() {
      //this.$store.dispatch("query");
      this.$store.dispatch("queryAirports").then(() => {
        this.airports = this.$store.getters.allAirports;
        console.log(this.airports);
      });
    }*/

  }
};
</script>