<template>
    <Page @loaded="load" >
        <ActionBar title="Airport list" class="action-bar"/>


  <ScrollView orientation="vertical">
      <StackLayout height="100%">
        <StackLayout width="95%" marginTop="15" borderRadius="5" paddingTop="5">

                
                <ListView for="airport in $store.state.data" class="list-group" @itemTap="onAirportNameTap">
                  <v-template>
                    <GridLayout columns="auto,*" rows="*, *" paddingLeft="10" paddingTop="5" paddingBottom="5" paddingRight="5">
                      <StackLayout width="95%" marginTop="15" borderRadius="5" paddingTop="5"  class="list-group-item">
                        <Label v-bind:text="airport.faaID + ' ' + airport.airportName" class="list-group-item-heading"/>
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
  props: ["airportName"],
  data() {
    return {
        faaID: "",
        airportName: ""
    }
  },
  methods: {
    //onAirportNameTap: function(args) {
      onAirportNameTap(args) {
      alert(args.index + " " + this.airports[args.index].airportName + " " + args);
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