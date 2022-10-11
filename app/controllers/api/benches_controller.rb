class Api::BenchesController < ApplicationController
    wrap_parameters include: Bench.attribute_names

    def index
        @benches = Bench.all
        render :index
    end

    def show
        debugger
        @bench = Bench.find(params[:id])
        render :show
    end

    def create
        @bench = Bench.new(bench_params)

        if @bench.save
            render :show
        else
            render json: @bench.errors.full_messages, status: 422
        end
    end

    private

    def bench_params
        debugger
        params.require(:bench).permit(:title, :description, :price, :seating, :lat, :lng)
    end
end
