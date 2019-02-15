<template>
    <Page @loaded="loadRunway">
        <ActionBar title="Runway list" class="action-bar"/>


            <ScrollView orientation="vertical">

               
                <ListView for="runway in $store.state.data" class="list-group"  @itemTap="onRunwayHeadingTap">
                  <v-template>
                    <GridLayout columns="auto,*" rows="*, *" paddingLeft="10" paddingTop="5" paddingBottom="5" paddingRight="5">
                      <StackLayout width="95%" marginTop="15" borderRadius="5" paddingTop="5"  class="list-group-item">
                        <Label v-bind:text="runway.faaID + ' ' + runway.runway" class="list-group-item-heading"/>
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
        rwyHeading: ""
    }
  },
  methods: {
    loadRunway() {
      
      this.$store.dispatch("queryRunway").then(() => {
        this.runways = this.$store.getters.allRunway;
        console.log("Length of Runway List: " + this.runways.length);
        console.log("Show this.allRunway.runways: " + this.allRunway.runways);
      });

    },
    
    onRunwayHeadingTap(args) {

       this.$modal.close(args.item);

    }

  }
};
</script>