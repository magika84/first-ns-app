<template>
    <Page @loaded="loadAircrafts" >
        <ActionBar title="Airport list" class="action-bar"/>


  <ScrollView orientation="vertical">
      <StackLayout height="100%">
        <StackLayout width="95%" marginTop="15" borderRadius="5" paddingTop="5">

                
                <ListView for="aircraft in this.aircrafts" class="list-group" @itemTap="onAircraftNameTap">
                  <v-template>
                    <GridLayout columns="auto,*" rows="*, *" paddingLeft="10" paddingTop="5" paddingBottom="5" paddingRight="5">
                      <StackLayout width="95%" marginTop="15" borderRadius="5" paddingTop="5"  class="list-group-item">
                        <Label v-bind:text="aircraft.aircraftName + ' ' + aircraft.aircraftnumber " class="list-group-item-heading"/>
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
        aircrafts: []
       
    }
  },
  methods: {


    loadAircrafts() {

      this.$store.dispatch("queryAircrafts").then(() => {
        this.aircrafts = this.$store.getters.allAircrafts;
        

      });

    },

    onAircraftNameTap(args) {

       // alert(args.index + " " + args.item.faaID + " " +  args.item.airportName);
       this.$modal.close(args.item);

    }


  }
};
</script>