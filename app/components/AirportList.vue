<template>
    <Page @loaded="loadAirports">
        <ActionBar title="Airport list" class="action-bar"/>


  <ScrollView orientation="vertical">

               
                <ListView for="airport in $store.state.data" class="list-group"  @itemTap="onAirportNameTap">
                  <v-template>
                    <GridLayout columns="auto,*" rows="*, *" paddingLeft="10" paddingTop="5" paddingBottom="5" paddingRight="5">
                      <StackLayout width="95%" marginTop="15" borderRadius="5" paddingTop="5"  class="list-group-item">
                        <Label v-bind:text="airport.faaID + ' ' + airport.airportName" class="list-group-item-heading"/>
                      </StackLayout>
                    </GridLayout>
                  </v-template>
                </ListView>
          

  </ScrollView>

    </Page>
</template>

<script>
export default {
  data() {
     return {
        faaID: "",
        airportName: ""
    }
  },
  methods: {
    loadAirports() {
      //this.$store.dispatch("query");
      this.$store.dispatch("queryAirports").then(() => {
        this.airports = this.$store.getters.allAirports;
        console.log(this.airports);
      });

    },
    //onAirportNameTap: function(args) {
    onAirportNameTap(args) {
      //this.airportsource.airportName = args.item.airportName;
      //this.navigateBack();
       // alert(args.index + " " + args.item.faaID + " " +  args.item.airportName);
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