<script src="http://192.168.1.176:8098"></script>
<template>
    <Page >
        <ActionBar title="Runway List" class="action-bar"/>

                <ListView for="runway in this.$store.getters.showspcfcRunwayList" class="list-group"  @itemTap="onRunwayHeadingTap">
                  <v-template>
                    <GridLayout columns="auto,*" rows="*, *" paddingLeft="10" paddingTop="5" paddingBottom="5" paddingRight="5">
                      <StackLayout width="95%" marginTop="15" borderRadius="5" paddingTop="5"  class="list-group-item">
                        <Label v-bind:text="runway.rnwyfaaID + ' ' + runway.runway" class="list-group-item-heading"/>
                      </StackLayout>
                    </GridLayout>
                  </v-template>
                </ListView>

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


    
    onRunwayHeadingTap(args) {
       
       this.$modal.close(args.item);

    }

  }
};
</script>